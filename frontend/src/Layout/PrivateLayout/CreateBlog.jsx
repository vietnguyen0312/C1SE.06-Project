import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import styled from "styled-components";
import ButtonCPN from "../../components/Button/Button";
import axios from "../../Configuration/AxiosConfig";
import { useNavigate } from "react-router-dom";
import LoadingIcons from "react-loading-icons";
import { toast } from "react-toastify";

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

export const EditorWrapper = styled.div`
  flex: 1;
  width: 50%;
  margin-right: 20px;
`;

export const PreviewWrapper = styled.div`
  background-color: white;
  width: 50%;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
`;

export const Title = styled.h2`
  margin-bottom: 20px;
  text-align: center;
`;

export const ErrorMessage = styled.div`
  color: red;
  margin-bottom: 10px;
`;

export const StyledQuill = styled(ReactQuill)`
  .ql-container {
    height: 200px;
    overflow-y: auto;
  }
`;

export const StyledContainer = styled.div`
  width: 100%;
  height: auto;
  overflow: hidden;
  border-radius: 1rem;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);

  display: flex;
  flex-direction: column;
`;

export const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  margin: 1rem 0;
  object-fit: contain;
`;

export const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 20px;
`;

export const ButtonStyled = styled(ButtonCPN)`
  height: 50px;
  padding: 0 15px;
  font-size: 16px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  transition: background 0.3s ease;

  &:hover {
    background-color: #388e3c;
  }
`;

export const FixedButtonContainer = styled.div`
  position: fixed;
  width: 100%;
  max-width: 500px;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
`;

export const TrashButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  width: 24px;
  height: 24px;
  background-image: url("/img/bin.png");
  background-size: cover;
  transition: opacity 0.3s;

  &:hover {
    opacity: 0.7; /* Slightly fade on hover */
  }
`;

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [contentOpen, setContentOpen] = useState("");
  const [bodySections, setBodySections] = useState([]);
  const [error, setError] = useState("");
  const [blogType, setBlogType] = useState("");
  const [blogTypes, setBlogTypes] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchUser = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      const response = await axios.get("/users/myInfo");
      setUser(response.result);
    }
  };

  useEffect(() => {
    fetchUser();
    const fetchBlogTypes = async () => {
      const response = await axios.get("/blogTypes");
      setBlogTypes(response.result);
    };

    fetchBlogTypes();
  }, []);

  const handleAddTextSection = () => {
    setBodySections((prevSections) => [...prevSections, ""]);
  };

  const handleAddImageSection = () => {
    setBodySections((prevSections) => [
      ...prevSections,
      { type: "image", file: null, name: "" },
    ]);
  };

  const handleBodyChange = (index, value) => {
    const updatedSections = [...bodySections];
    updatedSections[index] = value;
    setBodySections(updatedSections);
  };

  const handleImageChange = (index, event) => {
    const file = event.target.files[0];
    const updatedSections = [...bodySections];
    updatedSections[index].file = file;
    updatedSections[index].name = file.name;
    setBodySections(updatedSections);
  };

  const handleRemoveBodySection = (index) => {
    setBodySections((prevSections) =>
      prevSections.filter((_, i) => i !== index)
    );
  };

  const handleRemoveImage = (index) => {
    const updatedSections = [...bodySections];
    updatedSections[index].file = null;
    updatedSections[index].name = "";
    setBodySections(updatedSections);
  };

  const handleSubmit = async () => {
    if (
      !title.trim() ||
      !contentOpen.trim() ||
      bodySections.every((section) => !section.file && !section.trim())
    ) {
      setError(
        "Tiêu đề, nội dung mở và ít nhất một phần nội dung không được để trống!"
      );
      return;
    }

    const blogData = {
      title,
      contentOpen,
      body: "",
      blogTypeId: blogType,
      userId: user.id,
      status: "1",
    };

    bodySections.forEach((section) => {
      if (typeof section === "string") {
        blogData.body += section + " ";
      } else if (section.type === "image") {
        blogData.body += "|*image*| ";
      }
    });
    blogData.body = blogData.body.trim();

    setIsSubmitting(true);
    setLoading(true);

    try {
      const response = await axios.post("/blogs", blogData);
      const blogId = response.result.id;
      let index = 1; // Bắt đầu từ 1

      const uploadPromises = bodySections.map((section) => {
        if (section.type === "image") {
          return uploadImage(section.file, blogId, index++);
        }
        return Promise.resolve();
      });

      await Promise.all(uploadPromises);

      toast.success("Lưu thành công!");
      navigate(-1);
    } catch (error) {
      setError("Đã xảy ra lỗi khi lưu!");
    } finally {
      setIsSubmitting(false);
      setLoading(false);
    }
  };

  const uploadImage = async (file, blogId, number) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("filename", `${blogId}_${number}`);
    const response = await axios.post("/upload/imgBlog", formData);
    const params = {
      image: response.result,
      blogId: blogId,
    };
    await axios.post(`/blogImage`, params);
  };

  if (loading) {
    return <LoadingIcons.SpinningCircles />;
  }

  return (
    <BlogEditorContainer style={{ opacity: isSubmitting ? 0.5 : 1 }}>
      <EditorWrapper>
        <h2 style={{ marginBottom: "20px", textAlign: "center" }}>
          Tạo tin mới
        </h2>

        {error && <ErrorMessage>{error}</ErrorMessage>}
        <select
          value={blogType}
          onChange={(e) => setBlogType(e.target.value)}
          style={{
            width: "100%",
            marginBottom: "20px",
            padding: "10px",
            fontSize: "16px",
            border: "1px solid #e5e5e5",
            borderRadius: "4px",
          }}
        >
          <option value="">Chọn loại</option>
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
            height: "auto",
            resize: "vertical",
          }}
          wrap="soft"
        />
        {bodySections.map((section, index) => (
          <div key={index} style={{ marginBottom: "20px" }}>
            {section.type === "image" ? (
              <ImageContainer>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(event) => handleImageChange(index, event)}
                  style={{ marginBottom: "10px" }}
                />
                {section.file && (
                  <StyledContainer>
                    <p>Hình ảnh đã chọn: {section.name}</p>
                    <StyledImage
                      src={URL.createObjectURL(section.file)}
                      alt="Selected"
                      style={{ width: "100%", margin: "1rem 0" }}
                    />
                  </StyledContainer>
                )}
                <TrashButton onClick={() => handleRemoveBodySection(index)} />
              </ImageContainer>
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
            ) : (
              section.file && (
                <StyledImage
                  src={URL.createObjectURL(section.file)}
                  alt="Preview"
                />
              )
            )}
          </div>
        ))}
      </PreviewWrapper>
      <FixedButtonContainer>
        <ButtonStyled
          style={{ width: "300%", fontSize: "14px" }}
          onClick={handleAddTextSection}
          text="Thêm văn bản"
          disabled={isSubmitting}
        />
        <ButtonStyled
          style={{ width: "300%", fontSize: "14px" }}
          onClick={handleAddImageSection}
          text="Thêm hình ảnh"
          disabled={isSubmitting}
        />
        <ButtonStyled
          style={{ width: "200%", fontSize: "14px" }}
          onClick={handleSubmit}
          text="Lưu"
          disabled={isSubmitting}
        />
      </FixedButtonContainer>
    </BlogEditorContainer>
  );
};

export default CreateBlog;