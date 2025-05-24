"use client";

import React from "react";
import { Form, Input, Select, DatePicker, Button } from "antd";

const { RangePicker } = DatePicker;

const FilterSection = () => {
  return (
    <Form layout="vertical" className="space-y-4 mb-5">
      <Form.Item label="Title">
        <Input placeholder="Search by title" className="w-full" />
      </Form.Item>
      <Form.Item label="Content">
        <Input placeholder="Search by content" className="w-full" />
      </Form.Item>
      <Form.Item label="Category">
        <Select placeholder="Select category" className="w-full">
          {/* Options will be dynamically populated */}
        </Select>
      </Form.Item>
      <Form.Item label="Status">
        <Select placeholder="Select status" className="w-full">
          <Select.Option value="published">Published</Select.Option>
          <Select.Option value="draft">Draft</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item label="Created At">
        <RangePicker className="w-full" />
      </Form.Item>
      <Button type="primary" htmlType="submit" className="w-full">
        Apply Filters
      </Button>
    </Form>
  );
};

export default FilterSection;
