import type { UploadApiErrorResponse, UploadApiResponse } from "cloudinary";
import { v2 as cloudinary } from "cloudinary";

export async function uploadToCloudinary(
  fileBuffer: Buffer,
  fileType: "image" | "video",
) {
  try {
    const uploadResult = await new Promise<UploadApiResponse>(
      (resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "autocast", resource_type: fileType },
          (
            error: UploadApiErrorResponse | undefined,
            result: UploadApiResponse | undefined,
          ) => {
            if (error) return reject(error);
            if (!result)
              return reject(new Error("Cloudinary returned no result."));
            resolve(result);
          },
        );

        stream.end(fileBuffer);
      },
    );

    return uploadResult.secure_url;
  } catch (error) {
    console.error("Cloudinary upload failed:", error);
    throw error;
  }
}
