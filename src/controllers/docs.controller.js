import DocumentService from "../services/document.service";
import cloudinary from "../config/cloudinary";
const { createDocument,getDocuments, approveOrRejectDocument } = DocumentService;

class DocsController {
  static addDocController = async (req, res) => {
    try {
      if ("files" in req) {
        const pictures = req.files;
        console.log(pictures)
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
        console.log(req.body)
        const doc = await createDocument(
          req.body.user,
          req.body.documentType,
          req.body.documentNumber,
          req.body.documentImageUrl
        );
        console.log(doc)
        return res
          .status(201)
          .json({ message: "Document added successfully", doc });
      }
    } catch (error) {
      console.log(error);
      return res.status(201).json({message: "Server error", error})
    }

    console.log(req.body);
  };

  static getAllPendingVerification = async (req, res) =>{
    try {
      const allNotApprovedDocs = await getDocuments({isApproved:false})
      return res.status(200).json({message:"all requests", data: allNotApprovedDocs})
      
    } catch (error) {
      console.log(error);
      return res.status(201).json({message: "Server error", error})
    }
  }
}
export default DocsController;
