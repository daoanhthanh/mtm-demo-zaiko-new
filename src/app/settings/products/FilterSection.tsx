"use client";

import React, { useEffect } from "react";
import { Form, Input, Select, DatePicker, Button } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslation } from "@refinedev/core";
import { SearchOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;

const statusMap: Record<number, string> = {
  1: "published",
  2: "draft",
};

const FilterSection = ({ categories }: { categories: { id: string; title: string }[] }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [form] = Form.useForm();
  const { translate: t } = useTranslation();


  useEffect(() => {
    const initialValues = {
      content: searchParams.get("content") || "",
      category: searchParams.get("category")
        ? searchParams
            .get("category")
            ?.split(",")
            .map((category) => parseInt(category, 10))
        : undefined,
      status: searchParams.get("status")
        ? searchParams
            .get("status")
            ?.split(",")
            .map((status) => statusMap[parseInt(status, 10)])
        : undefined,
      createdAt: (() => {
        const fromDate = (() => {
          const from = searchParams.get("from");
          if (!from) return null;
          const parsedDate = dayjs(from, "YYYYMMDD");
          return parsedDate.isValid() ? parsedDate : null;
        })();

        const toDate = (() => {
          const to = searchParams.get("to");
          if (!to) return null;
          const parsedDate = dayjs(to, "YYYYMMDD");
          return parsedDate.isValid() ? parsedDate : null;
        })();

        return fromDate && toDate ? [fromDate.toDate(), toDate.toDate()] : undefined;
      })(),
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
      const [from, to] = values.createdAt;
      if (from) params.set("from", from.toISOString().split("T")[0].replace(/-/g, ""));
      if (to) params.set("to", to.toISOString().split("T")[0].replace(/-/g, ""));
    }

    router.push(`?${params.toString()}`);
  };

  return (
    <Form
      form={form}
      layout="horizontal"
      style={{
        padding: "15px",
        marginBottom: "9px"
      }}
      className="rounded-2xl border-2 border-[var(--ant-color-primary)]"
      onFinish={handleFinish}
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <Form.Item label={t("blog_posts.fields.content")} name="content">
          <Input className="w-30px" />
        </Form.Item>
        <Form.Item label={t("blog_posts.fields.category")} name="category">
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
        <Form.Item label={t("blog_posts.fields.status.title")} name="status">
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
        <Form.Item label={t("blog_posts.fields.createdAt")} name="createdAt">
          <RangePicker className="w-80px" />
        </Form.Item>
      </div>
      <div className="flex justify-end items-center gap-4">
        <Button
          type="default"
          className="w-fit-content"
          onClick={() => {
            form.resetFields();
            router.push("?");
          }}
        >
          {t("buttons.clear")}
        </Button>
        <Button
          type="primary"
          htmlType="submit"
          className="w-fit-content"
        >
          <SearchOutlined />
        </Button>
      </div>
    </Form>
  );
};

export default FilterSection;
