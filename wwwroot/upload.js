/** @format */

// upload.js

export async function uploadFile(urn, fileName, fileType, folderId, token) {
    const apiUrl = `https://developer.api.autodesk.com/data/v1/projects/${urn}/folders/${folderId}/contents`;
    const fileData = file;
    const res1 = await fetch(apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/vnd.api+json",
            Authorization: `Bearer ${token}`,
            "x-ads-region": "US",
        },
        body: JSON.stringify({
            jsonapi: { version: "1.0" },
            data: {
                type: "items",
                attributes: {
                    displayName: fileName,
                    extension: { type: "items:autodesk.core:File" },
                },
                relationships: {
                    tip: {
                        data: {
                            type: "versions",
                            id: "1",
                        },
                    },
                },
            },
        }),
    });

    const item = await res1.json();
    const uploadUrl = item.data.links.uploadUrl;
    const objectId = item.data.id;

    const res2 = await fetch(uploadUrl, {
        method: "PUT",
        headers: {
            "Content-Type": fileType,
        },
        body: fileData,
    });

    if (res2.status === 200) {
        return objectId;
    } else {
        throw new Error("Failed to upload file");
    }
}