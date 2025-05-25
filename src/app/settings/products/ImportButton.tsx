"use client";
import React, { useState } from "react";
import { Button, Spin } from "antd";

const ImportButton = () => {
  const [importing, setImporting] = useState(false);

  const handleImport = async () => {
    setImporting(true);
    try {
      // Simulate import process
      await new Promise((resolve) => setTimeout(resolve, 2000));
      alert("Import successful!");
    } catch {
      alert("Import failed.");
    } finally {
      setImporting(false);
    }
  };

  return (
    <div className="mb-5 flex items-center">
      {importing && <Spin className="mr-2" />}
      <Button type="primary" onClick={handleImport} disabled={importing}>
        Import
      </Button>
    </div>
  );
};

export default ImportButton;
