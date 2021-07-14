export function bodyParser(event){
  try {
    let body = JSON.parse(event.body)
    return body;
  }
  catch (e) {
    return {
        statusCode: 400,
        body: JSON.stringify({
          success: false,
          message: "Body not found"
        })
      }
  }
}

export function validator(arr = {}, requiredField = []){
  requiredField.forEach(el => {
    if( !arr[el] ) return {
        statusCode: 400,
        body: JSON.stringify({
          success: false,
          message: "Incomplete"
        })
      }
  });
}

export function generateInsertStatement(tableName: string, data: Object){
  let query = "INSERT INTO `"+tableName+"`";
  let cols = "";
  let values = "";
  Object.keys(data).forEach((key) => {
    cols+= `\`${key}\`,`;
    values+= `'${stringEscaper(String(data[key]))}',`;
  });
  cols = cols.replace(/(^,)|(,$)/g, "");
  values = values.replace(/(^,)|(,$)/g, "");
  query += `(${cols}) VALUES (${values})`;
  
  return query;
}

export function generateUpdateStatement(tableName: string, data: Object, where: string){
  let query = "UPDATE `"+tableName+"` SET ";
  let values = "";
  Object.keys(data).forEach((key) => {
    values+= `${key} = '${stringEscaper(String(data[key]))}',`;
  });
  values = values.replace(/(^,)|(,$)/g, "");
  query += ` ${values} WHERE ${where}`;
  
  return query;
}

export function selectResponse(data, message = "Ok"){
  return { statusCode:200, body: JSON.stringify({
    success: true,
    message,
    data
  }) }
}

export function errorResponse(statusCode=500, message=""){
  const cmessage = {200: "Ok", 400: "Bad Request", 401: "Unauthorized", 403: "Forbidden", 404: "Not Found", 405: "Method not allowed", 500: "Server Error"}

  return { statusCode, body: JSON.stringify({
    success: statusCode === 200,
    message: message || cmessage[statusCode] || ""
  }) }
}

export function nonSelectQueryResponse(results, okMessage = "Ok", errorMessage ="Something wrong"){
  if( results && results.affectedRows > 0 ){
    return { statusCode:200, body: JSON.stringify({
      success: true,
      message: okMessage
    }) }
  }
  return errorResponse(500, errorMessage)
}

export function stringEscaper(str: string){
  var regex = new RegExp(/[\0\x08\x09\x1a\n\r"'\\\%]/g);
  var escaper = function escaper(char){
      var m = ['\\0', '\\x08', '\\x09', '\\x1a', '\\n', '\\r', "'", '"', "\\", '\\\\', "%"];
      var r = ['\\\\0', '\\\\b', '\\\\t', '\\\\z', '\\\\n', '\\\\r', "''", '""', '\\\\', '\\\\\\\\', '\\%'];
      return r[m.indexOf(char)];
  };

  return str.replace(regex, escaper);
}