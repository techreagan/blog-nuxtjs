export default (context, inject) => {
  const htmlDecode = (input) => {
    const e = document.createElement('div')
    e.innerHTML = input
    return e.childNodes.length === 0 ? '' : e.childNodes[0].nodeValue
  }

  inject('htmlDecode', htmlDecode)
  // context.$htmlDecode = htmlDecode
}
