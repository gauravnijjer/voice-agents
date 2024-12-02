// import { NextResponse } from "next/server";
// import path from "path";
// import { writeFile } from "fs/promises";

// export const POST = async (req, res) => {
//   const formData = await req.formData();

//   const file = formData.get("file");
//   if (!file) {
//     return NextResponse.json({ error: "No files received." }, { status: 400 });
//   }

//   const buffer = Buffer.from(await file.arrayBuffer());
//   const filename =  file.name.replaceAll(" ", "_");
//   console.log(filename);
//   try {
//     await writeFile(
//       path.join(process.cwd(), "public/assets/" + filename),
//       buffer
//     );
//     return NextResponse.json({ Message: "Success", status: 201 });
//   } catch (error) {
//     console.log("Error occured ", error);
//     return NextResponse.json({ Message: "Failed", status: 500 });
//   }
// };
import { NextResponse } from "next/server";
import path from "path";
import { writeFile, mkdir } from "fs/promises";

export const POST = async (req) => {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ error: "No files received." }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = file.name.replaceAll(" ", "_");

    const uploadDir = path.join(process.cwd(), "public", "assets");

    // Ensure the directory exists
    await mkdir(uploadDir, { recursive: true });

    // Write the file to the directory
    const filePath = path.join(uploadDir, filename);
    await writeFile(filePath, buffer);

    return NextResponse.json({ message: "File uploaded successfully!" }, { status: 201 });
  } catch (error) {
    console.error("Error occurred:", error);
    return NextResponse.json(
      { error: "Failed to upload file", details: error.message },
      { status: 500 }
    );
  }
};
