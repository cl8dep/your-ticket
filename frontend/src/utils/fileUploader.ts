import { joinUrl } from ".";

const fileUploader = async (file: File) => {

    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', 'ticket');

    try {
        const response = await fetch(joinUrl(process.env.NEXT_PUBLIC_API_URL, "media"), {
            method: 'POST',
            body: formData,
        });

        if (response.status === 200) {
            const jsonBody = await response.json();
            return joinUrl(process.env.NEXT_PUBLIC_API_URL, 'static', jsonBody.url);
        } else {
          return "fail";
        }
    } catch (error) {
        console.error('Error:', error);
        return "fail";
    }
  };
  
  export default fileUploader;
  