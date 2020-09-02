<form action="" method="post">
  <fieldset>
    <div>
      <label for="name">Имя:</label>
      <input type="text" name="name" id="name" required>
    </div>
    <div>
      <label for="surname">Фамилия:</label>
      <input type="text" name="surname" id="surname" required>
    </div>
    <div>
      <label for="phone">Телефон:</label>
      <input type="text" name="phone" id="phone" required>
    </div>
    <div>
      <label for="email">Электронная почта:</label>
      <input type="text" name="email" id="email" required>
    </div>
    <div>
      <label for="city">Город:</label>
      <input type="text" name="city" id="city" required>
    </div>
    <div>
      <label for="company">Компания:</label>
      <input type="text" name="company" id="company" required>
    </div>
  </fieldset>
  <button type="submit">Отправить</button>
  <div id="info_msg"><?php global $info_msg; echo $info_msg; ?></div>
</form>
