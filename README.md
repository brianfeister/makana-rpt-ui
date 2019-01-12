## Programming challenge

Please choose the RPT for the role you are applying to and follow the README instructions below:

- **[Web UI RPT](./WebREADME.md)**

- **[Mobile RPT](./MobileREADME.md)**

### Notes re: Improvement

- Lists should all have a `key={}` prop, I think I missed keys in a few places (has performance impact re: diffing / reconciliation internally with React)
- I had attempted to use `props...history.push('/')` for login redirection but it was throwing an error that seemed to indicate an interruption in a component lifecycle event. In retrospect, I believe the child component's history redirect to root state was interrupting a parent component's lifecycle, thus in theory the problem could've been solved by passing a callback down from the parent so that `props...history.push()` was called from a parent component, no longer interrupting a parent lifecycle from a child further down the tree.
- The `Compose` component, while I'm proud of it's re-use, got a bit rushed toward the end, it's doing alot and probably needs to be broken into more than 1 component
