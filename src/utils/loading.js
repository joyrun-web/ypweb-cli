import ora from 'ora'

function loading (action = 'getting', repo = '') {
  const loading = ora(`${action} ${repo}`)
  return loading.start()
}

export default loading;
