// "use server"
// import { v2 as cloudinary } from 'cloudinary'



// export default async function uploadAudio(blob) {

//     console.log("BLOB: ",blob)
//   try {
//     const audioUrl = URL.createObjectURL(blob);
//     // const contentType = response.headers.get("Content-Type");
//     const arrayBuffer = await blob.arrayBuffer();
// const buffer = Buffer.from(arrayBuffer);
// const dataUri = `data:audio;base64,${buffer.toString('base64')}`;
    
//     const result = await cloudinary.uploader.upload(dataUri,{
//       resource_type: "video", // Use "video" for audio files
//     //   file: blob
//     });

//     console.log("Upload result:", result); // Logs details about the uploaded audio file
//   } catch (error) {
//     console.error("Error uploading file:", error);
//   }
// }


// // export default async function uploadAudio(formData) {


// //     try {
// //         const response = await fetch('https://api.cloudinary.com/v1_1/dgiduvbkl/audio/upload', {
// //             method: 'POST',
// //             body: formData, // Send the FormData directly, no need to stringify it
// //         });

// //         if (!response.ok) {
// //             const err = await response.json();
// //             console.log("ERROR IS: ", err);
// //             return { success: false, data: null };
// //         }

// //         const result = await response.json();
// //         return { success: true, data: result };

// //     } catch (error) {
// //         console.log("ERROR WHILE POSTING AUDIO: ", error);
// //         return { success: false, data: null, error: error.message }; // Return error details
// //     }
// // }

"use server"
import { v2 as cloudinary } from 'cloudinary'

export default async function uploadAudio(blob,fileName) {
    console.log("BLOB: ", blob);

    let filename = fileName || 'audioFile.mp3'
    try {
        
        const formData = new FormData();

        formData.append('file', blob, filename); 
        formData.append('api_key', process.env.CLOUDINARY_API_KEY);
        formData.append('api_secret', process.env.CLOUDINARY_API_SECRET);
        formData.append('upload_preset', process.env.CLOUDINARY_UNSIGNED_PRESET);

  
        const result = await fetch(`https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/upload`, {
            method: 'POST',
            body: formData,
            headers: {
                // 'Authorization': `Basic ${btoa(`${process.env.CLOUDINARY_API_KEY}:${process.env.CLOUDINARY_API_SECRET}`)}`
                'Authorization': `Basic ${process.env.CLOUDINARY_API_SECRET}`
      
            }
        });

        const data = await result.json();
        console.log("Upload result:", data); // Logs details about the uploaded audio file
        return {data:data, success:true }
    } catch (error) {
        console.error("Error uploading file:", error);
    }
}
