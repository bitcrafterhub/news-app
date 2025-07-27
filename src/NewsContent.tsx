
import {
  AppBar,
  Typography,
} from "@mui/material";

type Article = {
  title: string;
  description: string;
  content: string;
  urlToImage?: string;
};

type Tprops = {
    article: Article
}



const Content = ({article}: Tprops) => {

    return(
        <>
            <AppBar position="static" color="secondary">
                <Typography>
                    {article.title}
                </Typography>
            </AppBar>
            <Typography variant="body2" color="text.secondary">
                {article.content}
            </Typography>
        </>

    );
}

export default Content