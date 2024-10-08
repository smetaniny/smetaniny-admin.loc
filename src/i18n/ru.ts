import { TranslationMessages } from "react-admin";
import englishMessages from "ra-language-english";

const customRussianMessages: TranslationMessages = {
  ...englishMessages,
  pos: {
    search: "Поиск",
    configuration: "Конфигурация",
    language: "Язык",
    theme: {
      name: "Тема",
      light: "Светлая",
      dark: "Тёмная",
    },
    dashboard: {
      monthly_revenue: "Месячная выручка",
      month_history: "История выручки за 30 дней",
      new_orders: "Новые заказы",
      pending_reviews: "Ожидающие отзывы",
      all_reviews: "Посмотреть все отзывы",
      new_customers: "Новые клиенты",
      all_customers: "Посмотреть всех клиентов",
      pending_orders: "Ожидающие заказы",
      order: {
        items:
          "от %{customer_name}, один товар |||| от %{customer_name}, %{nb_items} товаров",
      },
      welcome: {
        title: "Добро пожаловать в демо e-commerce react-admin",
        subtitle:
          "Это админка воображаемого магазина постеров. Не стесняйтесь исследовать и изменять данные - они локальны для вашего компьютера и будут сбрасываться при каждом обновлении страницы.",
        ra_button: "Сайт react-admin",
        demo_button: "Источник этого демо",
      },
    },
    menu: {
      sales: "Продажи",
      catalog: "Каталог",
      customers: "Клиенты",
    },
    events: {
      review: {
        title: 'Размещён отзыв на "%{product}"',
      },
      order: {
        title: "Заказан 1 постер |||| Заказано %{smart_count} постеров",
      },
    },
  },
  resources: {
    customers: {
      name: "Клиент |||| Клиенты",
      fields: {
        orders: "Заказы",
        first_seen: "Впервые увиден",
        full_name: "Имя",
        groups: "Сегменты",
        last_seen: "Последний визит",
        last_seen_gte: "Посетил с",
        name: "Имя",
        total_spent: "Общая сумма потраченного",
        password: "Пароль",
        confirm_password: "Подтвердите пароль",
        stateAbbr: "Штат",
      },
      filters: {
        last_visited: "Последний визит",
        today: "Сегодня",
        this_week: "На этой неделе",
        last_week: "На прошлой неделе",
        this_month: "В этом месяце",
        last_month: "В прошлом месяце",
        earlier: "Ранее",
        has_ordered: "Сделал заказ",
        has_newsletter: "Подписан на рассылку",
        group: "Сегмент",
      },
      fieldGroups: {
        identity: "Идентификация",
        address: "Адрес",
        stats: "Статистика",
        history: "История",
        password: "Пароль",
        change_password: "Изменить пароль",
      },
      page: {
        delete: "Удалить клиента",
      },
      errors: {
        password_mismatch: "Подтверждение пароля не совпадает с паролем.",
      },
    },
    orders: {
      name: "Заказ |||| Заказы",
      amount: "1 заказ |||| %{smart_count} заказов",
      title: "Заказ %{reference}",
      fields: {
        basket: {
          delivery: "Доставка",
          reference: "Ссылка",
          quantity: "Количество",
          sum: "Сумма",
          tax_rate: "Ставка налога",
          taxes: "Налог",
          total: "Итого",
          unit_price: "Цена за единицу",
        },
        address: "Адрес",
        customer_id: "Клиент",
        date_gte: "Прошло с",
        date_lte: "Прошло до",
        nb_items: "Количество товаров",
        total_gte: "Мин. сумма",
        status: "Статус",
        returned: "Возвращён",
      },
      section: {
        order: "Заказ",
        customer: "Клиент",
        shipping_address: "Адрес доставки",
        items: "Товары",
        total: "Итоги",
      },
    },
    invoices: {
      name: "Счёт |||| Счета",
      fields: {
        date: "Дата счёта",
        customer_id: "Клиент",
        order_id: "Заказ",
        date_gte: "Прошло с",
        date_lte: "Прошло до",
        total_gte: "Мин. сумма",
        address: "Адрес",
      },
    },
    products: {
      name: "Постер |||| Постеры",
      fields: {
        category_id: "Категория",
        height_gte: "Мин. высота",
        height_lte: "Макс. высота",
        height: "Высота",
        image: "Изображение",
        price: "Цена",
        reference: "Ссылка",
        sales: "Продажи",
        stock_lte: "Мало на складе",
        stock: "Запасы",
        thumbnail: "Миниатюра",
        width_gte: "Мин. ширина",
        width_lte: "Макс. ширина",
        width: "Ширина",
      },
      tabs: {
        image: "Изображение",
        details: "Детали",
        description: "Описание",
        reviews: "Отзывы",
      },
      filters: {
        categories: "Категории",
        stock: "Запасы",
        no_stock: "Нет в наличии",
        low_stock: "1 - 9 единиц",
        average_stock: "10 - 49 единиц",
        enough_stock: "50 единиц и больше",
        sales: "Продажи",
        best_sellers: "Бестселлеры",
        average_sellers: "Средние продажи",
        low_sellers: "Низкие продажи",
        never_sold: "Никогда не продавался",
      },
    },
    categories: {
      name: "Категория |||| Категории",
      fields: {
        products: "Товары",
      },
    },
    reviews: {
      name: "Отзыв |||| Отзывы",
      amount: "1 отзыв |||| %{smart_count} отзывов",
      relative_to_poster: "Отзыв на постер",
      detail: "Детали отзыва",
      fields: {
        customer_id: "Клиент",
        order_id: "Заказ",
        product_id: "Продукт",
        date_gte: "Размещён с",
        date_lte: "Размещён до",
        date: "Дата",
        comment: "Комментарий",
        rating: "Оценка",
      },
      action: {
        accept: "Принять",
        reject: "Отклонить",
      },
      notification: {
        approved_success: "Отзыв одобрен",
        approved_error: "Ошибка: отзыв не одобрен",
        rejected_success: "Отзыв отклонён",
        rejected_error: "Ошибка: отзыв не отклонён",
      },
    },
    segments: {
      name: "Сегмент |||| Сегменты",
      fields: {
        customers: "Клиенты",
        name: "Имя",
      },
      data: {
        compulsive: "Компульсивный",
        collector: "Коллекционер",
        ordered_once: "Заказывал один раз",
        regular: "Регулярный",
        returns: "Возвраты",
        reviewer: "Рецензент",
      },
    },
  },
};

export default customRussianMessages;
