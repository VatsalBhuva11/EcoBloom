import React from "react";
import { FaFacebookSquare, FaInstagram, FaGithubSquare } from "react-icons/fa";

export default function Footer() {
    return (
        <div className="w-full  bg-[#0F1035] text-gray-300 py-8 px-2 ">
            <div className="max-w-[1240px] mx-auto  grid grid-cols-2 md:grid-cols-6 border-b-2 border-gray-600 py-8">
                <div>
                    <h6 className="font-medium uppercase text-gray-200 pt-2">
                        Solutions
                    </h6>
                    <div className="flex flex-col justify-center">
                        <a
                            className="py-2 text-sm cursor-pointer"
                            href="https://firebasestorage.googleapis.com/v0/b/ecobloom-gdsc-challenge.appspot.com/o/docs%2FAnalytics.pdf?alt=media&token=af25594c-921d-4a0c-849c-52e65f0d81e2 "
                            target="_blank"
                        >
                            Analytics
                        </a>
                        <a
                            className="py-2 text-sm cursor-pointer"
                            href="https://firebasestorage.googleapis.com/v0/b/ecobloom-gdsc-challenge.appspot.com/o/docs%2FCommerce.pdf?alt=media&token=0dc7e037-4161-46a3-aa70-798e49d58bd7
"
                            target="_blank"
                        >
                            Commerce
                        </a>
                        <a
                            className="py-2 text-sm cursor-pointer"
                            href="https://firebasestorage.googleapis.com/v0/b/ecobloom-gdsc-challenge.appspot.com/o/docs%2FInsight.pdf?alt=media&token=358bdc0c-2059-4c29-aec7-a278550aabcf
"
                            target="_blank"
                        >
                            Insight
                        </a>
                    </div>
                </div>

                <div>
                    <h6 className="font-medium text-gray-200 pt-2 uppercase">
                        Support
                    </h6>
                    <div className="flex flex-col justify-center">
                        <a
                            className="py-2 text-sm cursor-pointer"
                            href="https://firebasestorage.googleapis.com/v0/b/ecobloom-gdsc-challenge.appspot.com/o/docs%2FDocumentation.pdf?alt=media&token=872be372-a163-4eaa-8c85-dee638b41814
"
                            target="_blank"
                        >
                            Documentation
                        </a>
                        <a
                            className="py-2 text-sm cursor-pointer"
                            href="https://firebasestorage.googleapis.com/v0/b/ecobloom-gdsc-challenge.appspot.com/o/docs%2FGuides.pdf?alt=media&token=dbe51e30-8e82-47c9-942a-b2e54c8b3bed
"
                            target="_blank"
                        >
                            Guides
                        </a>
                    </div>
                </div>

                <div>
                    <h6 className="font-medium uppercase pt-2 text-gray-200">
                        Company
                    </h6>
                    <div className="flex flex-col justify-center">
                        <a
                            className="py-2 text-sm cursor-pointer"
                            href="https://firebasestorage.googleapis.com/v0/b/ecobloom-gdsc-challenge.appspot.com/o/docs%2FAbout.pdf?alt=media&token=bb1ee070-0724-4442-a938-46cf189223be
"
                            target="_blank"
                        >
                            About
                        </a>
                        <a
                            className="py-2 text-sm cursor-pointer"
                            href="https://firebasestorage.googleapis.com/v0/b/ecobloom-gdsc-challenge.appspot.com/o/docs%2FBlog.pdf?alt=media&token=a01c460d-e49a-4192-b450-cad5d9f781f0
"
                            target="_blank"
                        >
                            Blog
                        </a>
                        <a
                            className="py-2 text-sm cursor-pointer"
                            href="https://firebasestorage.googleapis.com/v0/b/ecobloom-gdsc-challenge.appspot.com/o/docs%2FPress.pdf?alt=media&token=3f37a620-77bb-4ce5-95e9-cbef91538315 "
                            target="_blank"
                        >
                            Press
                        </a>
                    </div>
                </div>

                <div>
                    <h6 className="pt-2 uppercase font-medium text-gray-200">
                        Legal
                    </h6>
                    <div
                        className="flex flex-col justify-center"
                        href=""
                        target="_blank"
                    >
                        <a
                            className="py-2 text-sm cursor-pointer"
                            href="https://firebasestorage.googleapis.com/v0/b/ecobloom-gdsc-challenge.appspot.com/o/docs%2FClaim.pdf?alt=media&token=883a5c3f-4e82-4eab-931d-9f80332b34a7
"
                            target="_blank"
                        >
                            Claim
                        </a>
                        <a
                            className="py-2 text-sm cursor-pointer"
                            href="https://firebasestorage.googleapis.com/v0/b/ecobloom-gdsc-challenge.appspot.com/o/docs%2FPolicies.pdf?alt=media&token=2c0183a7-f9e2-4953-b739-394b91680bc3
"
                            target="_blank"
                        >
                            Policies
                        </a>
                        <a
                            className="py-2 text-sm cursor-pointer"
                            href="https://firebasestorage.googleapis.com/v0/b/ecobloom-gdsc-challenge.appspot.com/o/docs%2FTerms%20%26%20Conditions.pdf?alt=media&token=809a2b39-ef17-4716-8af4-04ed9363384e
"
                            target="_blank"
                        >
                            Terms
                        </a>
                    </div>
                </div>
                <div className="col-span-2 pt-8 md:pt-2">
                    <p className="font-bold uppercase">
                        Subscribe to our Newsletter
                    </p>
                    <p className="py-4">
                        The latest new, articles and resources, sent to your
                        inbox weekly
                    </p>
                    <form className="flex flex-col sm:flex-row">
                        <input
                            className="rounded-md w-full p-2 text-black"
                            type="email"
                        />
                        <button className="py-2 px-2 ml-4">Subscribe</button>
                    </form>
                </div>
            </div>
            <div className="mt-2 flex flex-col  max-w-[1240px] m-auto justify-between sm:flex-row text-center text-gray-500">
                <p>EcoBloom - All rights reserverved</p>
                <div className="justify-evenly sm:w-[300px]  flex gap-2 mt-2">
                    <a
                        href="https://www.facebook.com/profile.php?id=61556828273634&mibextid=ZbWKwL"
                        target="_blank"
                    >
                        <FaFacebookSquare
                            className="cursor-pointer"
                            size={30}
                        />
                    </a>
                    <a
                        href="https://www.instagram.com/eco_bloom_/"
                        target="_blank"
                    >
                        <FaInstagram className="cursor-pointer" size={30} />
                    </a>
                    {/* <a
            href="https://www.github.com/Vatsalbhuva11/Ecobloom"
            target="_blank"
          >
            <FaGithubSquare size={30} className="cursor-pointer" />
          </a> */}
                </div>
            </div>
        </div>
    );
}
