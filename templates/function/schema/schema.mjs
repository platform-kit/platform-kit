import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
extendZodWithOpenApi(z);

const querySchema = z.object({
  search: z.optional(z.string()),
});

const paramsSchema = {
  id: z.optional(z.number()).openapi({
    param: {
      name: "id",
      in: "query",
    },
    example: 12345,
  }),
  name: z.optional(z.any()).openapi({
    param: {
      name: "name",
      in: "query",
    },
    example: "John",
  }),
};

const bodySchema = z.any();

const headersSchema = z.object({
  "Cache-Control": z.optional(z.string()),
});

var schema = {
  verbs: ["get"],
  tags: ["Generic Example"],
  query: querySchema,
  params: paramsSchema,
  body: {
    content: {
      "application/json": {
        schema: bodySchema,
      },
    },
  },
  headers: headersSchema,
  // You can manually specify a "summary" field to control how the endpoint appears in the UI
  // summary: "Example",
  description: "Returns a 'hello world' message.",
  security: "bearer",
  responses: {
    200: {
      description: "Object with message data.",
      content: {
        "application/json": {
          schema: bodySchema,
        },
      },
    },
    204: {
      description: "No content - successful operation",
    },
  },
};

export default schema;
