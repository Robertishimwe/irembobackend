import DocumentService from "../services/document.service";
import cloudinary from "../config/cloudinary";

const { createDocument } = DocumentService;
class DocsController {
  static addDocController = async (req, res) => {
    try {
      if ("files" in req) {
        const pictures = req.files;
        const urls = [];
        const uploadImages = pictures.map((image) =>
          cloudinary.uploader.upload(image.path, { folder: "irembo_docs" })
        );
        const imageResponse = await Promise.all(uploadImages);
        imageResponse.forEach((image) => {
          return urls.push(image.secure_url);
        });
        req.body = {
          user: req.user._id,
          ...req.body,
          documentImageUrl: urls[0],
        };

        const doc = await createDocument(
          req.body.user,
          req.body.documentType,
          req.body.documentNumber,
          req.body.documentImageUrl
        );
        return res
          .status(201)
          .json({ message: "Document added successfully", doc });
      }
    } catch (error) {
      console.log(error);
    }

    console.log(req.body);
  };
}
export default DocsController;
