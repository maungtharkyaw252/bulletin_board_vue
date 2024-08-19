<template>
    <nav class="navbar">
        <div class="left-blk">
            <h1 class="logo"><router-link to="/">Bulletin_Board</router-link></h1>
            <ul class="nav-links">
                <li><router-link to="/user">Users</router-link></li>
                <li><router-link to="/">Posts</router-link></li>
            </ul>
        </div>
        <div class="right-blk">
            <ul class="nav-links">
                <li class="toggle-drop-menu">
                    <span>
                        Maung Thar Kyaw
                    </span>
                    <ul class="drop-menu">
                        <li><span>Profile</span></li>
                        <li><span>logout</span></li>
                    </ul>
                </li>
            </ul>
        </div>
    </nav>
</template>
<style scoped>
.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 30px;
    background-color: #f0f0f0;
}

.navbar .left-blk,
.navbar .right-blk,
.nav-links {
    display: flex;
    align-items: center;
    gap: 15px;
}

.navbar .logo {
    margin-right: 15px;
}

.navbar li {
    padding: 10px;
}

.navbar .logo a,
.nav-links a {
    color: #02b844;
}

.navbar .logo a {
    font-size: 18px;
}

.navbar .drop-menu {
    position: absolute;
    top: 85px;
    left: 0;
    width: 100%;
    visibility: hidden;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    background-color: #fff;
    transition: all 0.3s ease;
    opacity: 0;
    border-radius: 3px;
}

.navbar .toggle-drop-menu {
    position: relative;
    cursor: pointer;
}

.toggle-drop-menu.open-menu .drop-menu {
    top: 50px;
    visibility: visible;
    opacity: 1;
}

.navbar .drop-menu li a {
    display: block;
    width: 100%;
    color: #000;
}

.admin-star {
    color: gold;
}
</style>
