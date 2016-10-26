const readline=require('readline');
const fs = require('fs');
var fGrainCount=0;
var flag=false;
var header =[];
var jsonData=[];
var tempData={};
var isHeader=true;
const rl = readline.createInterface
({
  input: fs.createReadStream('../csv/Production-Department_of_Agriculture_and_Cooperation_1.csv')
});
rl.on('line', function(line)
{
  var lineRecords= line.trim().split(',');
  if(isHeader)
  {       
    header=line.trim().split(',');
    isHeader=false;
  }
  else
  {
    for(var i=0;i<lineRecords.length;i++)
    {
      if(/Particulars/i.test(header[i]))
      {
        if(/agricultural production oilseeds/i.test(lineRecords[i])||(/^agricultural production foodgrains/i.test(lineRecords[i])&&fGrainCount==0))
        {
          flag=true;
          if(/agricultural production oilseeds/i.test(lineRecords[i]))
          {
            fGrainCount++;
            if(fGrainCount>0)
              break;
          }
          if(i==0)
          {
            tempData[header[i]]=lineRecords[i];
          }
          else 
          {
            tempData[header[i]]=lineRecords[i+1];
          }  
        }
      }
      if(flag==true&&/3-2013/i.test(header[i]))
      {
        if(i==0)
        {
          tempData[header[i]]=parseFloat(lineRecords[i]);
        }
        else 
        {
          tempData[header[i]]=parseFloat(lineRecords[i+1]);
        }
        jsonData.push(tempData)
      }
    }
  }
  flag=false;
  tempData={};
  fs.writeFileSync("../json/foodgrain.json",JSON.stringify(jsonData),encoding="utf8");
});