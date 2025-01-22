---
title: OneShot Refuge Factory Puzzle Solver
tags: "Information Theory"
draft: true
---

## Status

Not started

## End Goal

I want to learn how to write an efficient algorithm for how to solve the [OneShot Refuge Factory Light Puzzle](https://www.youtube.com/watch?v=VaPQGiTq8Bc) using the fundamentals of [information theory](https://en.wikipedia.org/wiki/Information_theory).

I will be working on this project in my free time with other concurrent projects, so I don't know when I will be done with the research phase of the project. It's probable that, while learning the fundamentals of information theory, I will spin off other side projects as tangents to better understand the material. I may need to expand or pivot my research scope as I learn more about the subject area and become aware of the knowledge prerequisites to approach the problem efficiently.

## Preliminary Research

In preliminary research on how to approach the problem, I found this [awesome write-up](https://gist.github.com/rkevin-arch/77fc4949ae5ccd407c372251ddcfb279?permalink_comment_id=5085588) by [rkevin-arch](https://gist.github.com/rkevin-arch) which goes through their approach to the problem and possible algorithms. They approach the light puzzle with intuitive human logic, a [minimax solver](https://en.wikipedia.org/wiki/Minimax), and a [max entropy solver](https://en.wikipedia.org/wiki/Entropy_(information_theory)) based on a [3blue1brown video on information theory](https://www.youtube.com/watch?v=v68zYyaEmEA). Since I am unfamiliar with information theory and these types of problems, it's time to learn!

While I have looked to these previous resources as inspiration to guide my research, I do not want to heavily rely on them as the basis for my solution. They have provided a jumping point for where to start, and I will only compare my solution with other solutions once I have approached the problem from my perspective.

## Roadmap

### Research

- [ ] Read [R. McEliece, *The Theory of Information and Coding*, 2nd ed. Cambridge: Cambridge University Press, 2002.](https://www.cambridge.org/core/books/theory-of-information-and-coding/F2A9E1FF14E7EF61148F63CCE9315BF5#fndtn-contents)
- [ ] **Optional?** Read [R. B. Ash, *Information theory*. New York: Dover Publications, 1990.](https://store.doverpublications.com/products/9780486665214)
- [ ] ...

### Implementation

- [ ] Implement algorithm to solve light puzzle
- [ ] Create write-up of algorithm
- [ ] Create website inspired by [https://osmmsolver.rkevin.dev/](https://osmmsolver.rkevin.dev/)

## Progress Log

- **12/31/24:** Defined [end goal](#end-goal), start of [preliminary research](#preliminary-research), and [starting roadmap](#roadmap) for the problem. Now that I know that this is an [information theory](https://en.wikipedia.org/wiki/Information_theory) problem because of a [previous write-up](https://gist.github.com/rkevin-arch/77fc4949ae5ccd407c372251ddcfb279?permalink_comment_id=5085588) by [rkevin-arch](https://gist.github.com/rkevin-arch), I defined my starting research texts
by looking at what is used in [Georgia Tech's MATH
4280: Introduction to Information Theory class](https://math.gatech.edu/courses/math/4280).
