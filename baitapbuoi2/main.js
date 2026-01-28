const POST_API = "http://localhost:3000/posts";
const COMMENT_API = "http://localhost:3000/comments";

/* ===================== POSTS ===================== */

/* LOAD POSTS */
async function LoadData() {
    let res = await fetch(POST_API);
    let posts = await res.json();
    let body = document.getElementById("body_table");
    body.innerHTML = "";

    for (const post of posts) {
        let style = post.isDeleted ? "text-decoration:line-through;color:gray" : "";

        body.innerHTML += `
        <tr style="${style}">
            <td>${post.id}</td>
            <td>${post.title}</td>
            <td>${post.views}</td>
            <td>
                <input type="button" value="Delete" onclick="DeletePost('${post.id}')">
            </td>
        </tr>`;
    }
}

/* SAVE POST (ADD / UPDATE) */
async function Save() {
    let id = document.getElementById("id_txt").value;
    let title = document.getElementById("title_txt").value;
    let views = document.getElementById("view_txt").value;

    // CREATE (ID RỖNG)
    if (id === "") {
        let res = await fetch(POST_API);
        let posts = await res.json();

        let maxId = posts.length > 0
            ? Math.max(...posts.map(p => parseInt(p.id)))
            : 0;

        let newId = (maxId + 1).toString();

        await fetch(POST_API, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id: newId,
                title: title,
                views: views,
                isDeleted: false
            })
        });
    }
    // UPDATE
    else {
        await fetch(POST_API + "/" + id, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id: id,
                title: title,
                views: views,
                isDeleted: false
            })
        });
    }

    LoadData();
}

/* SOFT DELETE POST */
async function DeletePost(id) {
    let res = await fetch(POST_API + "/" + id);
    let post = await res.json();

    await fetch(POST_API + "/" + id, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            ...post,
            isDeleted: true
        })
    });

    LoadData();
}

/* ===================== COMMENTS ===================== */

/* LOAD COMMENTS */
async function LoadComments() {
    let res = await fetch(COMMENT_API);
    let comments = await res.json();
    let list = document.getElementById("comment_list");
    list.innerHTML = "";

    for (const c of comments) {
        let style = c.isDeleted ? "text-decoration:line-through;color:gray" : "";

        list.innerHTML += `
        <li style="${style}">
            (${c.postId}) ${c.content}
            <button onclick="DeleteComment('${c.id}')">Delete</button>
        </li>`;
    }
}

/* ADD COMMENT */
async function SaveComment() {
    let postId = document.getElementById("post_id_txt").value;
    let content = document.getElementById("comment_txt").value;

    let res = await fetch(COMMENT_API);
    let comments = await res.json();

    let maxId = comments.length > 0
        ? Math.max(...comments.map(c => parseInt(c.id)))
        : 0;

    let newId = (maxId + 1).toString();

    await fetch(COMMENT_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            id: newId,
            postId: postId,
            content: content,
            isDeleted: false
        })
    });

    LoadComments();
}

/* SOFT DELETE COMMENT */
async function DeleteComment(id) {
    let res = await fetch(COMMENT_API + "/" + id);
    let c = await res.json();

    await fetch(COMMENT_API + "/" + id, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            ...c,
            isDeleted: true
        })
    });

    LoadComments();
}

/* AUTO LOAD */
LoadData();
LoadComments();
