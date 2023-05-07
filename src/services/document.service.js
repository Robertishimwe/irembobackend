import Document from "../models/documents";


class DocumentService {
  static createDocument = async (
    user,
    documentType,
    documentNumber,
    documentImageUrl
  ) => {
    try {
      const document = new Document({
        user,
        documentType,
        documentNumber,
        documentImageUrl,
      });
      await document.save();
      return document;
    } catch (error) {
      throw new Error(error);
    }
  };

  static getDocument = async (query) => {
    try {
      const document = await Document.findOne(query).populate("user");
      return document;
    } catch (error) {
      throw new Error(error);
    }
  };

  static getDocuments = async (query) => {
    try {
      const documents = await Document.find(query).populate("user");
      return documents;
    } catch (error) {
      throw new Error(error);
    }
  };

  static approveOrRejectDocument = async (_id) => {
    try {
      const document = await Document.findById(_id);

      if (document.isApproved === true) {
        document.isApproved = false;
        await document.save();
        return document;
      } else {
        document.isApproved = true;
        await document.save();
        return document;
      }
    } catch (error) {
      throw new Error(error);
    }
  };
}

export default DocumentService;