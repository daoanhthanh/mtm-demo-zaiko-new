import { FC, ReactNode, useState } from "react";

import { ExportOutlined, ImportOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { Button, Modal, Upload } from "antd";

import Index from "@/components/warning-content";

import styles from "./buttons.module.css";
import { useNotification, useTranslate } from "@refinedev/core";
// import { get } from "@/providers/http/request";
// import { endpoints } from "@/providers/endpoints";

export type FileHandleButtonProps = {
  type: "Export" | "Import";
  entity: "nhân viên";
  onSubmit: (file: File) => void;
  accept?: string;
  multiple?: boolean;
  label?: string;
  mockedFile?: string;
  body?: ReactNode;
};

export const FileHandleButton: FC<FileHandleButtonProps> = ({
  type,
  entity,
  accept,
  multiple,
  label,
  mockedFile,
  body,
}) => {
  const [openFileModal, setOpenFileModal] = useState(false);

  const { open } = useNotification();
  const t = useTranslate();

  const showModal = () => {
    setOpenFileModal(true);
  };

  const handleCancel = () => {
    setOpenFileModal(false);
  };

  const icon =
    type === "Export" ? <ExportOutlined /> : <ImportOutlined />;

  const importProps: UploadProps = {
    name: "file",
    action: "https://mockapi.io/api/upload",
    multiple: multiple,
    accept: accept,
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
      }
      if (info.file.status === "done") {
        open?.({
          type: "success",
          message: t("notifications.uploadSuccess", { fileName: info.file.name }),
          description: t("notifications.success"),
        });
      } else if (info.file.status === "error") {
        open?.({
          type: "error",
          message: t("notifications.uploadError", { fileName: info.file.name }),
          description: t("notifications.failure"),
        });
      }
    },
  };

  const downloadTemplate = async () => {
    // await get(
      // mockedFile
        // ? endpoints.downloadFile(mockedFile)
        // : endpoints.downloadFile("mau_file_khach_hang.xlsx"),
    // );
  };

  const ImportButton = () => {
    return (
      <Button icon={icon} size={"middle"}>
        {label ?? t("buttons.importFile")}
      </Button>
    );
  };

  const ExportButton = () => {
    return (
      <>
        <Button type="primary" size={"middle"} icon={icon} onClick={showModal}>
          {label ?? t("buttons.exportFile")}
        </Button>
        <Modal
          title={
            <>
              <h3>{t("modals.importTitle", { entity })}</h3>
              <a className={styles.downloadTemplate} onClick={downloadTemplate}>
                {t("modals.downloadTemplate")}
              </a>
            </>
          }
          open={openFileModal}
          onCancel={handleCancel}
          footer={[
            <Upload {...importProps}>
              <Button
                icon={icon}
                type={"primary"}
                style={{
                  marginLeft: "8px",
                }}
              >
                Chọn file dữ liệu
              </Button>
            </Upload>,
          ]}
        >
          {body}
          <Index
            content={
              <>
                <p>{t("modals.importLimit", { entity })}</p>
                <p>{t("modals.imageInstructions")}</p>
              </>
            }
          />
        </Modal>
      </>
    );
  };

  return <>{type === "Export" ? <ImportButton /> : <ExportButton />}</>;
};

FileHandleButton.defaultProps = {
  accept: "*",
  multiple: false,
  label: undefined,
};
