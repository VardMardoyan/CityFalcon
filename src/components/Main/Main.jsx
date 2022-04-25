import React, { useRef, useCallback } from "react";
import "./Main.css";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import logo from '../../assets/cityfalcon_logo.png';

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

const Main = ({ stories, loadMoreStories }) => {
    console.log(stories);
  const observer = useRef();
  const lastStoryElementRef = useCallback((node) => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        loadMoreStories();
      }
    });
    if (node) observer.current.observe(node);
  }, []);

  const addDefaultSrc = (ev) => {
    ev.target.src = 'https://imge.com/wp-content/uploads/2019/01/imge-logo-blue1.png';
  }
  return (
    <>
      {stories &&
        stories.map((story, index) => {
          if (stories.length === index + 1) {
            return (
              <Paper
                key={story.uuid + index}
                ref={lastStoryElementRef}
                sx={{
                  p: 2,
                  margin: "auto",
                  marginTop: '10px',
                  maxWidth: 900,
                  width: 800,
                  flexGrow: 1,
                  backgroundColor: (theme) => (theme.palette.mode === "dark" ? "#1A2027" : "#fff"),
                }}
              >
                <Grid container spacing={4}>
                  <Grid item>
                    <ButtonBase sx={{ width: 100, height: 100 }}>
                      <Img alt="complex" src={story.imageUrls} />
                    </ButtonBase>
                  </Grid>
                  <Grid item xs={12} sm container>
                    <Grid item xs container direction="column" spacing={4}>
                      <Grid item xs>
                        <Typography gutterBottom variant="subtitle1" component="div">
                          {story.description}
                        </Typography>
                        <ButtonBase sx={{ width: 25, height: 25 }}>
                          <Img alt="complex" src={story.domain_cached_logo_url} />
                        </ButtonBase>
                        {story.domain_name}
                      </Grid>
                    </Grid>
                    <Grid item>
                      <Typography variant="subtitle1" component="div">
                        {`${story.score}%`}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
            );
          } else {
            return (
              <Paper
                key={story.uuid + index}
                sx={{
                  p: 2,
                  margin: "auto",
                  marginTop: '10px',
                  maxWidth: 900,
                  width: 800,
                  flexGrow: 1,
                  backgroundColor: (theme) => (theme.palette.mode === "dark" ? "#1A2027" : "#fff"),
                }}
              >
                <Grid container spacing={4}>
                  <Grid item>
                    <ButtonBase sx={{ width: 100, height: 100 }}>
                      <Img onError={addDefaultSrc} className="img-responsive" src={story.imageUrls} />
                    </ButtonBase>
                  </Grid>
                  <Grid item xs={12} sm container >
                    <Grid item xs container direction="column" spacing={4}>
                      <Grid item xs>
                        <Typography gutterBottom variant="subtitle1" component="div" >
                          {story.description}
                        </Typography>
                        <ButtonBase sx={{ width: 25, height: 25 }}>
                          <Img alt="complex" src={story.domain_cached_logo_url} />
                        </ButtonBase>
                        {story.domain_name}
                      </Grid>
                    </Grid>
                    <Grid item>
                      <Typography variant="subtitle1" component="div">
                        {`${story.score}%`}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
            );
          }
        })}
    </>
  );
};

export default Main;