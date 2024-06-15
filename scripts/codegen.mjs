/* eslint-disable no-console */
import {promises} from "fs";
import got from "got";
import swaggerToTS from "openapi-typescript";

const {writeFile} = promises;

const codegen = async () => {
    const response = await got
        .post(`http://localhost:7777/api/v1/auth/authenticate`, {
            body: JSON.stringify({
                "email": "test",
                "password": "test"
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .json();

    const {token} = response

    const content = await got(`http://localhost:7777/v3/api-docs`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }).text();

    const input = JSON.parse(content);
    const output = await swaggerToTS(input);

    const outputFilePath = new URL(
        `../utils/generated-schema.ts`,
        import.meta.url
    );

    await writeFile(outputFilePath, output);

    console.log("-- done --");
};

codegen(process.argv[2]);
