/**
 * Напишите класс геометрической точки, принимающей в конструкторе координаты X и Y
 * Если координаты не переданы - 0,0; Аналогично если только 1 координата.
 * Реализовать метод, который возвращает расстояние от точки до центра координат (0, 0)
 */
class Point {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    distanceToOrigin() {
        const distance = Math.sqrt(this.x ** 2 + this.y ** 2);
        return distance;
    }
}

/**
 * Напишите класс геометрической точки в трехмерном пространстве (x, y, z),
 * который будет наследоваться от точки в двумерном пространстве.
 * Реализовать статический метод, который возвращает расстояние между Point3D.
 */
class Point3D extends Point {
    constructor(x = 0, y = 0, z = 0) {
        super(x, y);
        this.z = z;
    }

    static vectorLength(a, b) {
        const xx = b.x - a.x;
        const yy = b.y - a.y;
        const zz = b.z - a.z;

        const distance = Math.sqrt(xx ** 2 + yy ** 2 + zz ** 2);
        return distance;
    }
}

/**
 * Напишите класс "очередь", в котором можно добавить элемент в конец и получить из начала.
 * Предусмотреть 2 варианта инициализации - массивом в конструкторе (из него создается очередь) и без параметров.
 * Для тех, кто доверяет, но проверяет: написать тесты на методы класса (oop.spec.js)
 */
class Queue {
    constructor(array = []) {
        this.arr = [...array];
    }

    push(...n) {
        this.arr.push(...n);
    }

    pop() {
        if (this.arr.length === 0){
            return undefined;
        }
        return this.arr.shift();
    }

    size() {
        return this.arr.length;
    }

    clear() {
        this.arr = [];
        return this.arr.length;
    }
}

module.exports = {
    Point,
    Point3D,
    Queue,
};
