import busboy from "busboy";
import path from "path";
import fs from "fs";
import os from "os";
import { response_400 } from "../utils/responseCodes.js";

export default function filesUpload(req, res, next) {
    // See https://cloud.google.com/functions/docs/writing/http#multipart_data
    const bb = busboy({
        headers: req.headers,
        limits: {
            // Cloud functions impose this restriction anyway
            fileSize: 10 * 1024 * 1024,
        },
    });

    const fields = {};
    const files = [];
    const fileWrites = [];
    // Note: os.tmpdir() points to an in-memory file system on GCF
    // Thus, any files in it must fit in the instance's memory.
    const tmpdir = os.tmpdir();

    bb.on("field", (key, value) => {
        // You could do additional deserialization logic here, values will just be
        // strings
        fields[key] = value;
    });

    bb.on("file", (fieldname, file, info) => {
        const { filename, mimeType, encoding } = info;
        if (!fieldname.startsWith("optional") && !info.filename) {
            response_400(res, "Mandatory file not found");
            //HANDLE OPTIONAL FILES
        } else if (fieldname.startsWith("optional") && !info.filename) {
            console.log("No file.");
            file.resume();
        } else {
            const filepath = path.join(tmpdir, filename);
            const writeStream = fs.createWriteStream(filepath);
            file.pipe(writeStream);
            fileWrites.push(
                new Promise((resolve, reject) => {
                    file.on("end", () => writeStream.end());
                    writeStream.on("finish", () => {
                        fs.readFile(filepath, (err, buffer) => {
                            const size = Buffer.byteLength(buffer);
                            if (err) {
                                return reject(err);
                            }

                            files.push({
                                fieldname,
                                originalname: filename,
                                encoding,
                                mimeType,
                                buffer,
                                size,
                            });

                            // try {
                            // fs.unlinkSync(filepath);
                            // } catch (error) {
                            // return reject(error);
                            // }

                            resolve();
                        });
                    });
                    writeStream.on("error", reject);
                })
            );
        }
    });

    bb.on("finish", () => {
        Promise.all(fileWrites)
            .then(() => {
                req.body = fields;
                req.files = files;
                next();
            })
            .catch(next);
    });

    bb.end(req.rawBody);
}
