export default function updateWithData(model, data) {
  Object.keys(data).forEach((key) => {
    if (model.hasOwnProperty(key)) model[key] = data[key];
  });
}
