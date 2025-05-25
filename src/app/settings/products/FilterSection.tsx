"use client";

import React, { useEffect, useMemo } from "react";
import { Form, Input, Select, DatePicker, Button } from "antd";
import { useRouter, useSearchParams } from "next/navigation";

const { RangePicker } = DatePicker;

const statusMap: Record<number, string> = {
  1: "published",
  2: "draft",
};

const FilterSection = ({ categories }: { categories: { id: string; title: string }[] }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [form] = Form.useForm();

  useEffect(() => {
    const initialValues = {
      content: searchParams.get("content") || "",
      category: searchParams.get("category") || undefined,
      status: searchParams.get("status")
        ? searchParams
            .get("status")
            ?.split(",")
            .map((status) => statusMap[parseInt(status, 10)])
        : undefined,
      createdAt: searchParams.get("createdAt")
        ? searchParams.get("createdAt")?.split(",").map((date) => new Date(date))
        : undefined,
    };
    form.setFieldsValue(initialValues);
  }, [searchParams, form]);

  const handleFinish = (values: any) => {
    const params = new URLSearchParams();

    if (values.content) params.set("content", values.content);
    if (values.category) params.set("category", values.category);
    if (values.status) {
      params.set(
        "status",
        values.status.map((status: string) => Object.keys(statusMap).find((key) => statusMap[parseInt(key, 10)] === status)).join(",")
      );
    }
    if (values.createdAt) {
      params.set(
        "createdAt",
        values.createdAt.map((date: Date) => date.toISOString()).join(",")
      );
    }

    router.push(`?${params.toString()}`);
  };

  return (
    <Form
      form={form}
      layout="inline"
      className=" mb-5"
      onFinish={handleFinish}
    >
      <Form.Item label="Content" name="content">
        <Input placeholder="Search by content" className="w-50px" />
      </Form.Item>
      <Form.Item label="Category" name="category">
        <Select
          placeholder="Select category"
          className="min-w-[12rem]"
          mode="multiple"
        >
          {categories.map((category) => (
            <Select.Option key={category.id} value={category.id}>
              {category.title}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item label="Status" name="status">
        <Select
          placeholder="Select status"
          className="min-w-[10rem]"
          mode="multiple"
        >
          {Object.entries(statusMap).map(([key, value]) => (
            <Select.Option key={key} value={value}>
              {value}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item label="Created At" name="createdAt">
        <RangePicker className="w-80px" />
      </Form.Item>
      <Button type="primary" htmlType="submit" className="w-fit-content">
        Apply Filters
      </Button>
    </Form>
  );
};

export default FilterSection;
