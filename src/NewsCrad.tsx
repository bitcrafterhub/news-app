import {useCallback} from "react";
import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
} from "@mui/material";

type Article = {
  title: string;
  description: string;
  content: string;
  url: string;
  urlToImage?: string;
};

type Tprops = {
    article: Article
}

const NewsCard = ({ article }: Tprops) => {
  const handleOnclick = useCallback((): void=>{
        if (article.url) {
        window.open(article.url, "_blank");
    }
    },[article])
  
    return(
        <Card sx={{ display: "flex", mb: 2}}>
          {article.urlToImage && (
            <CardMedia
              component="img"
              sx={{ width: 160}}
              image={article.urlToImage}
              alt={article.title}
            />
          )}
          <CardActionArea onClick={handleOnclick}>
            <CardContent>
              <Typography variant="h6">{article.title}</Typography>
              <Typography variant="body2" color="text.secondary">
                {article.description}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      )};

export default NewsCard;
