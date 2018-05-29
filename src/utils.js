const generateStoryUrl = story => `/story/${story.primarySection.alias}/${story.slug}/${story.id}`;

const ping = () => 'pong';

export { generateStoryUrl, ping };
