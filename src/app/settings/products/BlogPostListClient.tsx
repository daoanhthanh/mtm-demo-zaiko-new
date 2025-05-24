"use client";

import {FileHandleButton} from "@components/buttons";
import {
  DateField,
  DeleteButton,
  EditButton,
  List,
  MarkdownField,
  ShowButton,
  CreateButton
} from "@refinedev/antd";
import { type BaseRecord, useTranslation } from "@refinedev/core";
import { Button, Space, Table, Typography } from "antd";
import Head from "next/head";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

interface BlogPost {
  id: string;
  title: string;
  content: string;
  status: string;
  createdAt: string;
  category: {
    id: string;
  };
}

interface Category {
  id: string;
  title: string;
}

interface BlogPostListClientProps {
  blogPosts: BlogPost[];
  categories: Category[];
  total: number;
}

export default function BlogPostListClient({
  blogPosts,
  categories,
  total
}: BlogPostListClientProps) {
  const { translate: t } = useTranslation();
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get current pagination from URL
  const currentPage = parseInt(searchParams.get("current") || "1");
  const pageSize = parseInt(searchParams.get("pageSize") || "10");

  // Create a map for quick category lookup
  const categoryMap = categories.reduce((acc, category) => {
    acc[category.id] = category.title;
    return acc;
  }, {} as Record<string, string>);

  // Handle pagination change
  const handleTableChange = useCallback((pagination: any) => {
    const params = new URLSearchParams(searchParams.toString());

    if (pagination.current) {
      params.set("current", pagination.current.toString());
    }
    if (pagination.pageSize) {
      params.set("pageSize", pagination.pageSize.toString());
    }

    router.push(`?${params.toString()}`);
  }, [router, searchParams]);

  // Transform data for Ant Design Table
  const tableProps = {
    dataSource: blogPosts,
    pagination: {
      current: currentPage,
      pageSize: pageSize,
      total,
      showSizeChanger: true,
      pageSizeOptions: ["10", "20", "50"],
      showQuickJumper: true,
      showTotal: (total: number, range: [number, number]) =>
        `${range[0]}-${range[1]} of ${total} items`,
    },
    onChange: handleTableChange,
  };

  return (
    <>
      <Head>
        <title>Settings | Products</title>
      </Head>
      <List headerButtons={() => {
          return (
            <Space>
              <FileHandleButton
                type={"Export"}
                entity={"nhân viên"}
                onSubmit={() => console.log("submitted")}
                label={"Xuất danh sách"}
              />

              <FileHandleButton
                type="Import"
                entity="nhân viên"
                accept=".xlsx"
                onSubmit={() => console.log("submitted")}
                label="Nhập danh sách"
                mockedFile="mau_file_nhan_vien.xlsx"
              />
              <CreateButton/>
            </Space>
          );
        }}>
        <Table {...tableProps} rowKey="id">
          <Table.Column dataIndex="id" title={t("ID")} />
          <Table.Column dataIndex="title" title={t("blog_posts.fields.title")} />
          <Table.Column
            dataIndex="content"
            title={t("blog_posts.fields.content")}
            render={(value: string) => {
              if (!value) return "-";
              return <MarkdownField value={`${value.slice(0, 80)}...`} />;
            }}
          />
          <Table.Column
            dataIndex="category"
            title={t("blog_posts.fields.category")}
            render={(value: { id: string }) => {
              return categoryMap[value?.id] || "-";
            }}
          />
          <Table.Column
            dataIndex="status"
            title={t("blog_posts.fields.status.title")}
            render={(value: string) => {
              return (
                <Typography.Text>
                  {t(`blog_posts.fields.status.${value}`)}
                </Typography.Text>
              );
            }}
          />
          <Table.Column
            dataIndex="createdAt"
            title={t("blog_posts.fields.createdAt")}
            render={(value: string) => <DateField value={value} />}
          />
          <Table.Column
            title={t("table.actions")}
            dataIndex="actions"
            render={(_, record: BaseRecord) => (
              <Space>
                <EditButton hideText size="small" recordItemId={record.id} />
                <ShowButton hideText size="small" recordItemId={record.id} />
                <DeleteButton hideText size="small" recordItemId={record.id} />
              </Space>
            )}
          />
        </Table>
      </List>
    </>
  );
}
