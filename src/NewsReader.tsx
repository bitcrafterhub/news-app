import {useEffect, useState } from "react";
import {
  Grid,
  CircularProgress,
  TextField,
  Stack,
  Box,
} from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import NewsCard from "./NewsCrad";
import Header from "./Header";

type Tprops = {
  onLogout: () => void;
}

type Article = {
  title: string;
  description: string;
  content: string;
  url: string;
  urlToImage?: string;
};

const NewsReader = (props: Tprops) => {
  const {onLogout} = props;
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch(
      `https://newsapi.org/v2/everything?q=apple&from=2025-07-05&to=2025-07-05&sortBy=popularity&apiKey=695fb74e43054e7bbb586c5f21052e6d`
    )
      .then((res) => res.json())
      .then((data) => {
        setArticles(data.articles);
        setLoading(false);
      });
  }, []);

  const filteredArticles = articles.filter((article) =>
    article.title.toLowerCase().includes(search.toLowerCase())
  );

  console.log(articles)

  return (
    <Stack direction="column" height="100%" width="100%">
          <Header onLogout={onLogout}/>
          <Stack>
             <TextField
              fullWidth
              variant="outlined"
              placeholder="Search news..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              InputProps={{
                startAdornment: <SearchIcon sx={{ mr: 1 }} />,
              }}
              sx={{ mb: 3 }}
            />
          </Stack>
          <Stack height="100%" width="100%">
               {loading ? (
            <Grid container justifyContent="center">
              <Box
                sx={{
                  height: '100vh',          // full viewport height
                  display: 'flex',
                  justifyContent: 'center', // horizontal center
                  alignItems: 'center',     // vertical center
                }}
              >
                <CircularProgress />
              </Box>
            </Grid>
          ) : (
            filteredArticles.map((article, index) => (
              <NewsCard key={index} article={article} />
            ))
          )}
          </Stack>
      </Stack>
  );
};

export default NewsReader;
