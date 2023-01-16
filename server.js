const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const path = require('path');
const fs = require('fs')
const { GraphQLClient, gql } = require('graphql-request')

const DEFAULT_TAGS = {
    title: "Djaminn - create music with others all on video",
    description: `Make music anytime, anywhere.
    Connect with real musicians.
    Publish your tracks and wake up
    the next day with dozens of songs.`,
    image: "https://play.djaminn.com/MetaSnap.jpg"
}

app.get('/song/:id', function (request, response) {
    console.log('Song page visited!');
    const filePath = path.resolve(__dirname, './build', 'index.html');
    fs.readFile(filePath, 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }

        const id = request?.params?.id
        fetchProjectDetails(id).then((project) => {
            console.log('Calling project')
            console.log('Project details: ', project?.name)

            data = data.replace(/\$OG_TITLE/g, project?.name || DEFAULT_TAGS?.title);
            data = data.replace(/\$OG_DESCRIPTION/g, project?.description || DEFAULT_TAGS?.description);
            data = data.replace(/\$OG_IMAGE/g, project?.headerImage || DEFAULT_TAGS?.image);
            result = data.replace(/\$OG_IMAGE_SECURE_URL/g, project?.headerImage || DEFAULT_TAGS?.image);
            response.send(result);
        })

    });
});

app.use(express.static(path.resolve(__dirname, './build')));


// app.get('*', function (request, response) {
//     console.log('Non-song page visited')
//     const filePath = path.resolve(__dirname, './build', 'index.html');
//     fs.readFile(filePath, 'utf8', function (err, data) {
//         if (err) {
//             return console.log(err);
//         }
//         data = data.replace(/\$OG_TITLE/g, DEFAULT_TAGS?.title);
//         data = data.replace(/\$OG_DESCRIPTION/g, DEFAULT_TAGS?.description);
//         data = data.replace(/\$OG_IMAGE/g, DEFAULT_TAGS?.image);
//         result = data.replace(/\$OG_IMAGE_SECURE_URL/g, DEFAULT_TAGS?.image);

//         response.send(result);
//     });
// });

// app.use(express.static(path.resolve(__dirname, './build')));




app.listen(port, () => console.log(`Listening on port ${port}`));


const fetchProjectDetails = async (id) => {
    const graphQLClient = new GraphQLClient('https://djaminn.trailfive.com/');
    const query = gql`
            query project($filter: ProjectWhereUniqueInput!) {
            Project(filter: $filter) {
                id
                description
                name
                headerImage
                headerVideo
                mixdownVideo
                hlsStreamWithVideo
            }
            }
    `;

    const vars = {
        "filter": {
            "id": id
        }
    }

    const response = await graphQLClient.request(query, vars);
    console.log("🚀 ~ file: server.js:91 ~ fetchProjectDetails ~ response", response)

    return response?.Project

}