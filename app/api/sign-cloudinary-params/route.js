import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request) {
    
    let abc = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
    console.log(abc, "ABC")

    const body = await request.json();

    console.log("BODY IS: ",body)

    const {paramsToSign } = body;

    const signature = cloudinary.utils.api_sign_request(paramsToSign,
        process.env.CLOUDINARY_API_SECRET
    )
    console.log(signature, "SIGNATURE")
    return Response.json({signature})
}
