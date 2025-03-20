import MainNavigation from '../components/MainNavigation';

function ErrorPage() {
  return <>
    <MainNavigation />
    <main>
      <h1>an error occurred</h1>
      <p>could not find page</p>
    </main>
  </>
}

export default ErrorPage;
