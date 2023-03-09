module.exports = {
    name: "playerStart", //TODO: Create enum maybe??
    async execute(queue, track, client) {
        //Changes the client activity to the currently playing Track
        client.user.setActivity(`🎶 | Now playing: ${track.title}`);
    }
}