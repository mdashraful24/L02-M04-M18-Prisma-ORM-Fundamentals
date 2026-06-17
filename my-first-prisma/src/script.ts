import { prisma } from "./lib/prisma";

async function main() {
    // Create a new user with a post
    // const user = await prisma.user.create({
    //     data: {
    //         name: "John Doe",
    //         email: "john.doe@example.com",
    //         posts: {
    //             create: {
    //                 title: "My first post",
    //                 content: "This is the content of my first post.",
    //                 published: true,
    //             },
    //         },
    //     },
    //     include: {
    //         posts: true,
    //     },
    // });
    // console.log("Created user:", user);

    const newPost = await prisma.post.create({
        data: {
            authorId: 1,
            title: "Another post",
            content: "This is another post.",
            published: true, 
        },
    });
    console.log("Created post:", newPost);

    // Fetch all users with their posts
    const allUsers = await prisma.user.findMany({
        include: {
            posts: true,
        },
    });
    console.log("All users:", JSON.stringify(allUsers, null, 2));
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
