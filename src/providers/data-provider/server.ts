import { DataProvider } from "@refinedev/core";

const API_URL = "https://api.fake-rest.refine.dev";

// Server-side data provider for fetching data on the server
export const dataProviderServer: DataProvider = {
  getApiUrl: () => API_URL,

  getList: async ({ resource, pagination, filters, sorters, meta }) => {
    const url = new URL(`${API_URL}/${resource}`);

    // Add pagination
    if (pagination) {
      if (pagination.current) {
        url.searchParams.append("_page", pagination.current.toString());
      }
      if (pagination.pageSize) {
        url.searchParams.append("_limit", pagination.pageSize.toString());
      }
    }

    // Add sorting
    if (sorters && sorters.length > 0) {
      const sorter = sorters[0];
      url.searchParams.append("_sort", sorter.field);
      url.searchParams.append("_order", sorter.order);
    }

    // Add filters
    if (filters) {
      filters.forEach((filter) => {
        if ("field" in filter && filter.operator === "eq") {
          url.searchParams.append(filter.field, filter.value);
        }
      });
    }

    const response = await fetch(url.toString());

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const total = response.headers.get("x-total-count") ?? data.length.toString();

    return {
      data,
      total: parseInt(total),
    };
  },

  getOne: async ({ resource, id }) => {
    const response = await fetch(`${API_URL}/${resource}/${id}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return {
      data,
    };
  },

  getMany: async ({ resource, ids }) => {
    const promises = ids.map(id =>
      fetch(`${API_URL}/${resource}/${id}`).then(res => res.json())
    );

    const data = await Promise.all(promises);

    return {
      data,
    };
  },

  create: async ({ resource, variables }) => {
    const response = await fetch(`${API_URL}/${resource}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(variables),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return {
      data,
    };
  },

  update: async ({ resource, id, variables }) => {
    const response = await fetch(`${API_URL}/${resource}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(variables),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return {
      data,
    };
  },

  deleteOne: async ({ resource, id }) => {
    const response = await fetch(`${API_URL}/${resource}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return {
      data,
    };
  },

  getCustom: async ({
    url,
    method = "GET",
    headers,
    query
  }: {
    url: string;
    method?: string;
    headers?: Record<string, string>;
    query?: Record<string, unknown>;
  }) => {
    const requestUrl = new URL(url);

    if (query) {
      Object.entries(query).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (typeof value === 'string' || typeof value === 'number') {
            requestUrl.searchParams.append(key, String(value));
          }
        }
      });
    }

    const response = await fetch(requestUrl.toString(), {
      method,
      headers,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return {
      data,
    };
  },
};
