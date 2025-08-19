
const NOTION_TOKEN = import.meta.env.VITE_NOTION_TOKEN;
// const SKILLS_DBID = import.meta.env.VITE_SKILLS_DBID;
const PROJECTS_DBID = import.meta.env.VITE_PROJECTS_DBID;

async function queryNotionDatabase() {
  const response = await fetch(
    `https://api.notion.com/v1/databases/${PROJECTS_DBID}/query`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${NOTION_TOKEN}`,
        "Notion-Version": "2022-06-28",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Request failed: ${response.status} ${response.statusText} - ${errorText}`
    );
  }

  const data = await response.json();
  return data;
}
