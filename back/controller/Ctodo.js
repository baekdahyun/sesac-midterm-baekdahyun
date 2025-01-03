const { Todo } = require("../models/index");

/* Todos 전체 목록 불러오기 */
exports.readAll = async (req, res) => {
  try {
    const Todos = await Todo.findAll();
    console.log(Todos);
    res.send(Todos);
  } catch (err) {
    console.log("err", err);
    res.status(500).send("server error");
  }
};

/* Todo 한 개 불러오기 */
exports.readOne = async (req, res) => {
  try {
    console.log(req.params); //id: '1'
    const { TodoId } = req.params; //'1'
    console.log(TodoId);

    const addTodo = await Todo.findOne({
      where: { id: TodoId },
    });
    res.send(addTodo);
  } catch (err) {
    console.log("err", err);
    res.status(500).send("Internal Server Error");
  }
};

/* 새로운 Todo 생성 */
exports.create = async (req, res) => {
  try {
    console.log(req.body);
    const newTodo = await Todo.create(req.body);
    res.send(newTodo);
  } catch (err) {
    console.log("err", err);
    res.status(500).send("Internal Server Error");
  }
};

/* 기존 Todo 수정 */
exports.update = async (req, res) => {
  try {
    console.log(req.body);
    const { TodoUpdate } = req.body;

    const updatedTodo = await Todo.update({
      id: req.body.TodoUpdate,
    });
    res.send(updatedTodo);
  } catch (err) {
    console.log("err", err);
    res.status(500).send("Internal Server Error");
  }
};

/* 기존 Todo 삭제 */
exports.delete = async (req, res) => {
  try {
    console.log(req.params);
    const { TodoId } = req.params;
    const isDeleted = await Todo.destroy({
      where: {
        id: TodoId,
      },
    });
    console.log("삭제 여부", isDeleted);
    if (Boolean(isDeleted)) {
      res.send("삭제 성공");
    } else res.send(false);
  } catch (err) {
    console.log("err", err);
    res.status(500).send("Internal Server Error");
  }
};
