<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Application architecture
- Keep the marketing experience on the index route with section anchors, because AFON is a one-page site.
- Define brand styling centrally in src/styles.css and use Button variants for actions, so the visual system stays consistent.
- Keep service scope and eligibility in a browser-safe domain module with numeric tests, so legal limits remain enforceable independently of copy.
- The initial request form is explicitly a non-delivering preview; do not add submission persistence or imply delivery without implementing a real owner-visible submission flow.
