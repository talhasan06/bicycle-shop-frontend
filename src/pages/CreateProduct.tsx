import React, { useState } from "react";
import {
  Form,
  Input,
  InputNumber,
  Upload,
  Button,
  message,
  Select,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import type { UploadFile } from "antd/es/upload/interface";
import { toast } from "sonner";
import { useCreateProductMutation } from "../redux/services/product/product";

type CycleType = "Mountain" | "Road" | "Hybrid" | "BMX" | "Electric";

export const cycleTypes: CycleType[] = [
  "Mountain",
  "Road",
  "Hybrid",
  "BMX",
  "Electric",
];

const CreateProduct: React.FC = () => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [createProduct, { isLoading }] = useCreateProductMutation();

  const onFinish = async (values) => {
    const loadingToast = toast.loading("Creating product...");

    const productData = {
      product: {
        model: values.model,
        brand: values.brand,
        category: values.category,
        description: values.description,
        price: values.price,
        quantity: values.quantity,
      },
    };

    const formData = new FormData();
    formData.append("data", JSON.stringify(productData));
    formData.append("file", values.image[0].originFileObj);

    try {
      const res = await createProduct(formData);
      toast.dismiss(loadingToast);

      if (res.data.success) {
        toast.success("Product created successfully", { id: loadingToast });
        form.resetFields();
        setFileList([]);
      }
    } catch (err) {
      toast.dismiss(loadingToast);
      toast.error("Failed to create product", { id: loadingToast });
    }
  };

  //   const uploadProps = {
  //     beforeUpload: (file: UploadFile) => {
  //       const isImage = file.type?.startsWith("image/");
  //       if (!isImage) {
  //         message.error("You can only upload image files!");
  //         return false;
  //       }
  //       const isLt2M = file.size ? file.size / 1024 / 1024 < 2 : false;
  //       if (!isLt2M) {
  //         message.error("Image must be smaller than 2MB!");
  //         return false;
  //       }
  //       return false; // Return false to prevent auto upload
  //     },
  //     onChange: ({ fileList: newFileList }: { fileList: UploadFile[] }) => {
  //       setFileList(newFileList);
  //     },
  //     fileList,
  //   };

  return (
    <div style={{ padding: "24px" }}>
      <h2>Create New Product</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        style={{ maxWidth: 600 }}
      >
        <Form.Item
          name="model"
          label="Product Model"
          rules={[{ required: true, message: "Please enter product model" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="brand"
          label="Brand"
          rules={[{ required: true, message: "Please enter brand name" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="category"
          label="Category"
          rules={[
            { required: true, message: "Please select product category" },
          ]}
        >
          <Select>
            {cycleTypes.map((type) => (
              <Select.Option key={type} value={type}>
                {type}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
          rules={[
            { required: true, message: "Please enter product description" },
          ]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item
          name="price"
          label="Price"
          rules={[{ required: true, message: "Please enter product price" }]}
        >
          <InputNumber
            min={0}
            precision={2}
            prefix="$"
            style={{ width: "100%" }}
          />
        </Form.Item>

        <Form.Item
          name="quantity"
          label="Quantity"
          rules={[{ required: true, message: "Please enter quantity" }]}
        >
          <InputNumber min={0} style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          name="image"
          label="Product Image"
          rules={[{ required: true, message: "Please upload a product image" }]}
          valuePropName="fileList"
          getValueFromEvent={(e) => {
            if (Array.isArray(e)) {
              return e;
            }
            return e?.fileList;
          }}
        >
          <Upload listType="picture">
            <Button icon={<UploadOutlined />}>Upload Image</Button>
          </Upload>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Create Product
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateProduct;
