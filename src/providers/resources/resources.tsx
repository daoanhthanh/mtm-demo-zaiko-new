import {ResourceProps, useTranslation} from "@refinedev/core";

const Resources: () => ResourceProps[] = () => {
    const { translate: t } = useTranslation();
    return [
        {
            name: "blog_posts",
            list: "/settings/products",
            create: "/settings/products/create",
            edit: "/settings/products/edit/:id",
            show: "/settings/products/show/:id",
            meta: {
                // label: t("blog_posts.fields.title"),
                canDelete: true,
            },
        },
        {
            name: "categories",
            list: "/categories",
            create: "/categories/create",
            edit: "/categories/edit/:id",
            show: "/categories/show/:id",
            meta: {
                canDelete: true,
            },
        },
    ]
}

export default Resources;