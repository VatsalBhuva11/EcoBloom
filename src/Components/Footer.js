import React from "react";
import {
    FaDribbbleSquare,
    FaFacebookSquare,
    FaInstagram,
    FaTwitterSquare,
    FaGithubSquare,
} from "react-icons/fa";

export default function Footer() {
    return (
        <div className="w-full bg-[#0F1035] text-gray-300 py-8 px-2 ">
            <div className="max-w-[1240px] mx-auto  grid grid-cols-2 md:grid-cols-6 border-b-2 border-gray-600 py-8">
                <div>
                    <h6 className="font-medium uppercase text-gray-200 pt-2">
                        Solutions
                    </h6>
                    <ul>
                        <li className="py-2 text-sm">Analytics</li>
                        <li className="py-2 text-sm">Marketing</li>
                        <li className="py-2 text-sm">Commerce</li>
                        <li className="py-2 text-sm">Insight</li>
                    </ul>
                </div>

                <div>
                    <h6 className="font-medium text-gray-200 pt-2 uppercase">
                        Support
                    </h6>
                    <ul>
                        <li className="py-2 text-sm">Pricing</li>
                        <li className="py-2 text-sm">Documentation</li>
                        <li className="py-2 text-sm">Guides</li>
                        <li className="py-2 text-sm">API status</li>
                    </ul>
                </div>

                <div>
                    <h6 className="font-medium uppercase pt-2 text-gray-200">
                        Company
                    </h6>
                    <ul>
                        <li className="py-2 text-sm">About</li>
                        <li className="py-2 text-sm">Blog</li>
                        <li className="py-2 text-sm">Jbs</li>
                        <li className="py-2 text-sm">Press</li>
                        <li className="py-2 text-sm">Career</li>
                    </ul>
                </div>

                <div>
                    <h6 className="pt-2 uppercase font-medium text-gray-200">
                        Legal
                    </h6>
                    <ul>
                        <li className="py-2 text-sm">About</li>
                        <li className="py-2 text-sm">Blog</li>
                        <li className="py-2 text-sm">Jbs</li>
                        <li className="py-2 text-sm">Press</li>
                        <li className="py-2 text-sm">Career</li>
                    </ul>
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
                            className="rounded-md w-full p-2 "
                            type="email"
                        />
                        <button className="py-2 px-2 ml-4">Subscribe</button>
                    </form>
                </div>
            </div>
            <div className="mt-2 flex flex-col  max-w-[1240px] m-auto justify-between sm:flex-row text-center text-gray-500">
                <p>EcoBloom - All rights reserverved</p>
                <div className="justify-between sm:w-[300px]  flex gap-2 mt-2">
                    <FaFacebookSquare size={30} />
                    <a
                        href="https://www.instagram.com/eco_bloom_/"
                        target="_blank"
                    >
                        <FaInstagram className="cursor-pointer" size={30} />
                    </a>
                    <FaTwitterSquare size={30} />
                    <FaGithubSquare size={30} />
                </div>
            </div>
        </div>
    );
}
