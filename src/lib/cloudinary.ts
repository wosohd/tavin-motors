import {
  v2 as cloudinary,
  type UploadApiResponse,
} from "cloudinary";

let configured = false;

function configureCloudinary() {
  if (configured) {
    return;
  }

  const cloudName =
    process.env.CLOUDINARY_CLOUD_NAME;

  const apiKey =
    process.env.CLOUDINARY_API_KEY;

  const apiSecret =
    process.env.CLOUDINARY_API_SECRET;

  if (
    !cloudName ||
    !apiKey ||
    !apiSecret
  ) {
    throw new Error(
      "Cloudinary environment variables are not configured.",
    );
  }

  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
    secure: true,
  });

  configured = true;
}

export async function uploadMarketplaceImage({
  file,
  userId,
}: {
  file: File;
  userId: string;
}) {
  configureCloudinary();

  const arrayBuffer =
    await file.arrayBuffer();

  const buffer =
    Buffer.from(
      arrayBuffer,
    );

  return new Promise<UploadApiResponse>(
    (
      resolve,
      reject,
    ) => {
      const stream =
        cloudinary.uploader.upload_stream(
          {
            resource_type:
              "image",

            folder:
              `tavin-motors/marketplace/${userId}`,
          },
          (
            error,
            result,
          ) => {
            if (
              error ||
              !result
            ) {
              reject(
                error ??
                  new Error(
                    "Cloudinary image upload failed.",
                  ),
              );

              return;
            }

            resolve(
              result,
            );
          },
        );

      stream.end(
        buffer,
      );
    },
  );
}

export async function deleteCloudinaryImage(
  publicId: string,
) {
  configureCloudinary();

  await cloudinary.uploader.destroy(
    publicId,
    {
      resource_type:
        "image",
    },
  );
}