const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");

function uploadToCloudinary(file, folder) {

    return new Promise((resolve, reject) => {

        console.log("Uploading to:", folder);
console.log("Cloud Name:", process.env.CLOUDINARY_CLOUD_NAME);
console.log("API Key:", process.env.CLOUDINARY_API_KEY);
console.log("Secret exists:", !!process.env.CLOUDINARY_API_SECRET);

        const stream = cloudinary.uploader.upload_stream(

            {
                folder
            },

            (error, result) => {

                if (error) {

                    reject(error);

                } else {

                    resolve(result);

                }

            }

        );

        streamifier.createReadStream(file.buffer).pipe(stream);

    });

}

module.exports = uploadToCloudinary;