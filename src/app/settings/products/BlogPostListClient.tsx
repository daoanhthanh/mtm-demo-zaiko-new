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
import { Space, Table, Typography } from "antd";
import Head from "next/head";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import FilterSection from "./FilterSection";

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
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);

  // Get current pagination from URL
  const currentPage = parseInt(searchParams.get("current") || "1");
  const pageSize = parseInt(searchParams.get("pageSize") || "10");

  // Create a map for a quick category lookup
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

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRowKeys(blogPosts.map((post) => post.id));
    } else {
      setSelectedRowKeys([]);
    }
  };

  const handleSelectRow = (id: string, checked: boolean) => {
    setSelectedRowKeys((prev) =>
      checked ? [...prev, id] : prev.filter((key) => key !== id)
    );
  };

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
        t("pagination.showTotal", {
          rangeStart: range[0],
          rangeEnd: range[1],
          total,
        }),
    },
    onChange: handleTableChange,
  };

  return (
    <>
      <Head>
        <title>{t("blog_posts.titles.list")}</title>
      </Head>
      <List headerButtons={() => {
          return (
            <Space>
              <FileHandleButton
                type={"Export"}
                entity={"nhân viên"}
                onSubmit={() => console.log("submitted")}
              />

              <FileHandleButton
                type="Import"
                entity="nhân viên"
                accept=".xlsx"
                onSubmit={() => console.log("submitted")}
                mockedFile="mau_file_nhan_vien.xlsx"
              />
              <CreateButton/>
            </Space>
          );
        }}>
          <FilterSection categories={categories} />
        <Table {...tableProps} rowKey="id">
          <Table.Column
            title={
              <input
                type="checkbox"
                aria-label="Select all"
                checked={selectedRowKeys.length === blogPosts.length}
                onChange={(e) => handleSelectAll(e.target.checked)}
              />
            }
            render={(_, record: BlogPost) => (
              <input
                type="checkbox"
                aria-label={`Select row ${record.id}`}
                checked={selectedRowKeys.includes(record.id)}
                onChange={(e) => handleSelectRow(record.id, e.target.checked)}
              />
            )}
          />
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
