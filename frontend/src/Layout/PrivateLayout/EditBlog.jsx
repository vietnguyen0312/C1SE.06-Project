import React, { useState, useEffect } from "react";
import "react-quill/dist/quill.snow.css";
import styled from "styled-components";
import LoadingIcons from "react-loading-icons";
import ConfirmModal from '../../components/ConfirmModal';
import axios from "../../Configuration/AxiosConfig";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import {
  TrashButton,
  PreviewWrapper,
  ButtonStyled,
  EditorWrapper,
  FixedButtonContainer,
  ImageContainer,
  StyledContainer,
  StyledImage,
  StyledQuill,
  ErrorMessage,
} from "./CreateBlog";
import { preconnect } from "react-dom";

const BlogEditorContainer = styled.div`
  display: flex;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  max-width: 100%;
  height: auto;
  margin: 20px auto;
  position: relative;
  padding-bottom: 70px;
`;

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blogType, setBlogType] = useState({ id: "", name: "" });
  const [selectedId , setSelectedId] = useState("");
  const [title, setTitle] = useState("");
  const [contentOpen, setContentOpen] = useState("");
  const [body, setBody] = useState(null);
  const [images, setImages] = useState([]);
  const [bodySections, setBodySections] = useState([]);
  const [error, setError] = useState("");
  const [blogTypes, setBlogTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isImageEdited, setIsImageEdited] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tempBlogData, setTempBlogData] = useState(null);
  const [initialData, setInitialData] = useState({
    title: "",
    contentOpen: "",
    blogType: { id: "", name: "" },
    bodySections: []
  });

  useEffect(() => {
    const fetchBlogDetails = async () => {
      const response = await axios.get(`/blogs/${id}`);
      const imagesResponse = await axios.get(
        `/blogImage/findImagesByBlog/${id}`
      );
      const blogData = response.result;
      setTitle(blogData.title);
      setBlogType({id : blogData.blogType.id , name : blogData.blogType.name});
      setSelectedId(blogData.blogType.id);
      setContentOpen(blogData.contentOpen);
      setBody(blogData.body);
      setImages(imagesResponse.result.map((img) => `${img.image}`));

      const sections = blogData.body.split("|");
      const newBodySections = []; // vì lỗi state nên mình tạo ra cái ni để khắc phục :))
      const urlImages = imagesResponse.result.map((img) => `${img.image}`);
      let index = 0;
      // cái ni là để lấy dữ liệu của cái Blog cũ cần update á
      sections.forEach((section) => {
        section = section.trim();
        if (section === "*image*") {          
          newBodySections.push({
            type: "image",
            file: null,
            name: urlImages[index],
            imgUrl: urlImages[index++],
          });
        } else if (section) {
          newBodySections.push(section);
        }
      });
      setBodySections(newBodySections);
      setLoading(false);  

      setInitialData({
        title: blogData.title,
        contentOpen: blogData.contentOpen,
        blogType: {id: blogData.blogType.id, name: blogData.blogType.name},
        bodySections: blogData.body
      });
    };

    const fetchBlogTypes = async () => {
      const response = await axios.get("/blogTypes");
      setBlogTypes(response.result);
    };

    fetchBlogDetails();
    fetchBlogTypes();
  }, [id]);

  const handleBodyChange = (index, value) => {
    const updatedSections = [...bodySections];
    updatedSections[index] = value;
    setBodySections(updatedSections);
  };

  const handleConfirm = async () => {
    try {
      const response = await axios.put(`/blogs/${id}`, tempBlogData);

      const cloudinary = await axios.get(`/blogImage/findImagesByBlog/${id}`);
      if (isImageEdited) {
        await axios.delete(`/upload/deleteImagesWithSubstring?prefix=${id}&folder=Blog`);
        await axios.delete(`/blogImage/${id}`);

        let imageIndex = 0;
        for (const section of bodySections) {
          if (section.type === "image" && section.file) {
            await uploadImage(section.file, id, imageIndex);
            imageIndex++;
          }
        }
      }
      toast.success("Cập nhật thành công!");
      setIsModalOpen(false);
      navigate(-1);
    } catch (error) {
      toast.error("Có lỗi xảy ra khi cập nhật!");
      setIsModalOpen(false);
    }
  };

  const hasChanges = () => {
    if (title !== initialData.title) return true;
    if (contentOpen !== initialData.contentOpen) return true;
    if (blogType.id !== initialData.blogType.id) return true;
    if (isImageEdited) return true;
    
    let currentContent = "";
    bodySections.forEach(section => {
      if (typeof section === "string") {
        currentContent += section + " ";
      } else if (section.type === "image") {
        currentContent += "|*image*| ";
      }
    });
    
    if (currentContent.trim() !== initialData.bodySections.trim()) return true;
    
    return false;
  };

  const handleUpdateBlog = () => {
    if (!hasChanges()) {
      toast.info("Không có thay đổi nào để cập nhật!");
      return;
    }

    if (
      !title.trim() ||
      !contentOpen.trim() ||
      bodySections.every((section) => {
        if (typeof section === "string") {
          return !section.trim();
        } else if (section.type === "image") {
          return !section.file && !section.imgUrl;
        }
        return true;
      })
    ) {
      setError(
        "Tiêu đề, nội dung mở và ít nhất một phần nội dung không được để trống!"
      );
      return;
    }

    const blogData = {
      title : title,
      contentOpen : contentOpen,
      body: "",
      status: "Đang hoạt động",
      blogType: blogType,
    };

    bodySections.forEach(section => {
      if (typeof section === "string") {
        blogData.body += section + " "; 
      } else if (section.type === "image") {
        blogData.body += "|*image*| "; 
      }
    });

    setTempBlogData(blogData);
    setIsModalOpen(true);
  };

  const uploadImage = async (file, blogId,index) => {
    index++;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('filename', blogId+"_"+index);
    const response = await axios.post('/upload/imgBlog', formData);
    const params = {
      image: response.result,
      blogId: blogId
    }
    await axios.post(`/blogImage`, params);
  };

  const handleAddTextSection = () => {
    setBodySections((prevSections) => [...prevSections, ""]);
  };

  const handleAddImageSection = () => {
    setBodySections((prevSections) => [
      ...prevSections,
      { type: "image", file: null, name: "" },
    ]);
  };

  const handleRemoveBodySection = (index) => {
    setBodySections((prevSections) =>
      prevSections.filter((_, i) => i !== index)
    );
  };

  const handleImageChange = (index, event) => {
    const file = event.target.files[0];
    const updatedSections = [...bodySections];
    updatedSections[index].file = file;
    updatedSections[index].name = file.name;
    setBodySections(updatedSections);
    setIsImageEdited(true);
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (loading) {
    return <LoadingIcons.SpinningCircles />;
  }

  return (
    <BlogEditorContainer>
      <EditorWrapper>
        <h3 style={{ marginBottom: "20px", textAlign: "center" }}>
          Chỉnh sửa Tin tức
        </h3>

        {error && <ErrorMessage>{error}</ErrorMessage>}
        <select
          value={selectedId} 
          onChange={(e) => {
            const selectedType = blogTypes.find(
              (type) => type.id === e.target.value
            );
            setSelectedId(selectedType.id);
            setBlogType({id : selectedType.id , name : selectedType.name});
          }}
          style={{
            width: "100%",
            marginBottom: "20px",
            padding: "10px",
            fontSize: "16px",
            border: "1px solid #e5e5e5",
            borderRadius: "4px",
          }}
        >
          {blogTypes.map((type) => (
            <option key={type.id} value={type.id}>
              {type.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Nhập tiêu đề..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{
            width: "100%",
            marginBottom: "20px",
            padding: "10px",
            fontSize: "16px",
            border: "1px solid #e5e5e5",
            borderRadius: "4px",
          }}
        />
        <textarea
          type="text"
          placeholder="Nhập nội dung mở đầu..."
          value={contentOpen}
          onChange={(e) => setContentOpen(e.target.value)}
          style={{
            width: "100%",
            marginBottom: "20px",
            padding: "10px",
            fontSize: "16px",
            border: "1px solid #e5e5e5",
            borderRadius: "4px",
            minHeight: "100px",
            resize: "vertical",
          }}
          wrap="soft"
        />
        {bodySections.map((section, index) => (
          <div key={index} style={{ marginBottom: "20px" }}>
            {section.type === "image" ? (
              <StyledContainer>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(event) => handleImageChange(index, event)}
                  style={{ marginBottom: "10px" }}
                />
                {section.file ? (
                  <StyledImage
                    src={URL.createObjectURL(section.file)}
                    alt={`image-${index}`}
                    style={{ width: "100%", margin: "1rem 0" }}
                  />
                ) : (
                  <StyledImage
                    src={section.imgUrl}
                    alt={`image-${index}`}
                    style={{ width: "100%", margin: "1rem 0" }}
                  />
                )}
                <p>Hình ảnh: {section.name}</p>
                <TrashButton onClick={() => handleRemoveBodySection(index)} />
              </StyledContainer>
            ) : (
              <div>
                <StyledQuill
                  value={section}
                  onChange={(value) => handleBodyChange(index, value)}
                  placeholder="Nhập nội dung blog của bạn..."
                />
                <TrashButton onClick={() => handleRemoveBodySection(index)} />
              </div>
            )}
          </div>
        ))}
      </EditorWrapper>
      <PreviewWrapper>
        <h5
          style={{ fontSize: "20px", fontWeight: "bold", textAlign: "center" }}
        >
          {title}
        </h5>
        <p>{contentOpen}</p>
        {bodySections.map((section, index) => (
          <div key={index}>
            {typeof section === "string" ? (
              <div dangerouslySetInnerHTML={{ __html: section }} />
            ) : section.file ? (
              <StyledImage
                src={URL.createObjectURL(section.file)}
                alt="Preview"
              />
            ) : (
              <StyledImage
                src={section.imgUrl}
                alt={`image-${index}`}
                style={{ width: "100%", margin: "1rem 0" }}
              />
            )}
          </div>
        ))}
      </PreviewWrapper>
      <FixedButtonContainer>
        <ButtonStyled
          style={{ width: "300%", fontSize: "14px" }}
          onClick={handleAddTextSection}
          text="Thêm văn bản"
        />
        <ButtonStyled
          style={{ width: "300%", fontSize: "14px" }}
          onClick={handleAddImageSection}
          text="Thêm hình ảnh"
        />
        <ButtonStyled
          style={{ width: "200%", fontSize: "14px" }}
          onClick={handleUpdateBlog}
          text="Cập nhật"
        />
        <ButtonStyled text="Quay lại" onClick={handleBack} />
      </FixedButtonContainer>
      <ConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirm}
        title="Xác nhận cập nhật"
        message="Bạn có chắc chắn muốn cập nhật bài viết này?"
        confirmText="Cập nhật"
        cancelText="Hủy"
      />
    </BlogEditorContainer>
  );
};

export default EditBlog;