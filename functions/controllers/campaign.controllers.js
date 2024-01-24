import { response_200, response_500 } from "../utils/responseCodes.js";
import Campaign from "../models/campaign.model.js";
import Organization, {
    Organization as OrganizationSchema,
} from "../models/organization.model.js";
import User from "../models/user.model.js";
import mongoose from "mongoose";
// import { storage } from "../config/firebaseAdmin.config.js";
// import { getDownloadURL } from "firebase-admin/storage";
import { Storage } from "@google-cloud/storage";
import axios from "axios";

mongoose.model("Organization", OrganizationSchema);

export const createCampaign = async (req, res) => {
    try {
        // const org = req.org.orgId;
        const org = req.org.orgId;
        const {
            name,
            address,
            city,
            country,
            startDate,
            endDate,
            goal,
            locationType,
        } = req.body;
        // console.log(
        //     "name: " + name,
        //     "address: " + address,
        //     "city: " + city,
        //     "country: " + country,
        //     "startDate: " + startDate,
        //     "endDate: " + endDate,
        //     "goal: " + goal,
        //     "location: " + locationType
        // );
        if (
            !address ||
            !city ||
            !country ||
            !startDate ||
            !endDate ||
            !goal ||
            !locationType
        ) {
            return response_500(res, "Please enter all fields");
        } else {
            const campaign = await Campaign.create({
                ...req.body,
                status: "UPCOMING",
                organization: org,
            });
            const updateOrg = await Organization.findByIdAndUpdate(org, {
                $push: { campaigns: campaign._id },
            });
            response_200(res, "Successfully created campaign", campaign);
        }
    } catch (err) {
        console.log(err);
        response_500(res, "Error occurred while creating campaign", err);
    }
};

//fix bug in createCampaign; unable to access req.body

//get upcoming campaigns
export const upcomingCampaigns = async (req, res) => {
    try {
        const campaigns = await Campaign.find({
            status: "UPCOMING",
        }).populate("organization");
        campaigns.sort((a, b) => {
            return a.startDate - b.startDate;
        });

        response_200(
            res,
            "Successfully fetched upcoming campaigns",
            campaigns.slice(0, 5)
        );
    } catch (err) {
        console.log(err);
        response_500(
            res,
            "Error occurred while fetching upcoming campaigns",
            err
        );
    }
};

export const verifyUser = async (req, res) => {
    try {
        const file = req.files[0];
        // >    fieldname: 'upload',
        // >    originalname: 'image.jpeg',
        // >    encoding: '7bit',
        // >    mimeType: 'image/jpeg',
        // >    buffer: <Buffer ff d8 ff e0 00 10 4a 46 49 46 00 01 01 00 00 01 00 01 00 00 ff e2 01 d8 49 43 43 5f 50 52 4f 46 49 4c 45 00 01 01 00 00 01 c8 00 00 00 00 04 30 00 00 ... 28304 more bytes>,
        // >    size: 28354
        const userId = req.query.userId;
        const user = await User.findById(userId);
        const blob = new Blob([file.buffer], { type: file.mimeType });
        // Get a v4 signed URL for reading the file
        const imageUrl = `https://storage.googleapis.com/ecobloom-gdsc-challenge.appspot.com/${user.photoPathFirestore}`;
        console.log("IMAGEURL: ", imageUrl);
        const imageResponse = await axios.get(imageUrl, {
            responseType: "arraybuffer",
        });
        // console.log("IMAGE RESPONSE: ", imageResponse);
        const blob2 = new Blob([imageResponse.data], {
            type: "image/jpg",
        });

        // Convert the image data to base64
        // const imageBuffer = Buffer.from(imageResponse.data, "binary");
        // const base64Image = imageBuffer.toString("base64");

        // Now 'base64Image' contains the base64 encoded image data
        // console.log(imageResponse);

        var formdata = new FormData();

        // console.log("URL: ", url);
        console.log("BLOB: ", blob);
        console.log("IMAGERESPONSE BLOB: ", blob2);
        formdata.append("image_file1", blob, "me.jpg");
        formdata.append("image_file2", blob2, "me2.jpg");
        formdata.append("api_key", "2_aNnUX2IvYGLSmrE5-eYMHxtdJQqoaX");
        formdata.append("api_secret", "zqyJvxsnPrhNIoJ3uXBSoZ-T493qtD0E");

        var requestOptions = {
            method: "POST",
            body: formdata,
            redirect: "follow",
        };

        fetch(
            "https://api-us.faceplusplus.com/facepp/v3/compare",
            requestOptions
        )
            .then((response) => response.json())
            .then((result) => {
                response_200(res, "Success", result);
            })
            .catch((error) => console.log("error", error));
    } catch (err) {
        console.log(err);
        response_500(res, "Error occurred while comparing images", err);
    }
};
