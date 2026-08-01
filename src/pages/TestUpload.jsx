import { useState } from "react";

export default function TestUpload() {
  const [image, setImage] = useState(null);

  const upload = async () => {
  if (!image) {
    alert("Choose an image first");
    return;
  }

  const formData = new FormData();

  formData.append("file", image);
  formData.append("upload_preset", "hostelhub_uploads");

  try {
    const response = await fetch(
      "https://api.cloudinary.com/v1_1/wfvj46ip/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();

    console.log("STATUS:", response.status);
    console.log("DATA:", data);

    alert("Upload complete!");

  } catch (error) {
    console.error(error);
  }
};

  return (
    <div className="p-10">
      <input
        type="file"
        onChange={(e) => setImage(e.target.files[0])}
      />

      <button
        onClick={upload}
        className="bg-green-600 text-white px-6 py-3 rounded mt-4"
      >
        Upload
      </button>
    </div>
  );
}