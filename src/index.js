/**
 * @param preferences - an array of integers. Indices of people, whom they love
 * @returns number of love triangles
 */
/*
входящий массив я воспринял как односвязонный список состоящий из узла и ссылки на след узел, тогда любовные треугольники являются зацикленостями в списке.
сначала зацикленность искал просто запоминая стартовый узел и двигаясь по списку сравнивал его с сылкой.
чтобы одна зацикленность считалась только один раз кастыльнул обнуление элементов массива и это же помогло мне избавится от бесконечных циклов а также помогло 
начать искать следующий треугольник-цикл с первого еще непровереного элемента в массиве.
потом кастыльнул исключение ситуации когда узел ссылается сам на себя, потом взаимную любовь (зацикленность из двух элементов) затем учет зацикленности только из трех элементов



*/
module.exports = function getLoveTrianglesCount(preferences = []) {
  let nubberTriangles=0;
  let indexOfFirstNode = preferences.findIndex((x)=>x != null);
  while(indexOfFirstNode != -1){
      let node = indexOfFirstNode + 1;
      let link = preferences[indexOfFirstNode];
      if(node == link){
        preferences[node-1] = null;
      }else{
        let allTriangleIndex = [];
        while(link != null){
          let indexOfNode = node-1;
          allTriangleIndex.push(node);
          if(allTriangleIndex.length > 3) allTriangleIndex.shift();
          if(allTriangleIndex.includes(link) && allTriangleIndex.length > 2 && allTriangleIndex[1] != link){
            nubberTriangles++;
            allTriangleIndex = [];
            break;
          }
          node = link;
          link = preferences[node-1];
          preferences[indexOfNode] = null;
          if(link == node){
            preferences[node-1] = null;
            link = null;
          }
        }
      indexOfFirstNode = preferences.findIndex((x)=>x != null); 
      }
  }
  return nubberTriangles;
};